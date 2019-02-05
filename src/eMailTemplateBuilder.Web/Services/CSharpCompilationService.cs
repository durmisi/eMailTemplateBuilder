using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace eMailTemplateBuilder.Web.Services
{
    public class CSharpCompilationService : ICSharpCompilationService
    {
        public CompilationResult Compile(string content, MetadataReference[] references)
        {
            var dummyAssemblyName = Path.GetRandomFileName();

            var compilationReferences = new List<MetadataReference>
            {
                MetadataReference.CreateFromFile(typeof(object).Assembly.Location), // include corlib
                MetadataReference.CreateFromFile(Assembly.GetExecutingAssembly().Location), // this file (that contains the MyTemplate base class)

                // for some reason on .NET core, I need to add this... this is not needed with .NET framework
                MetadataReference.CreateFromFile(Path.Combine(Path.GetDirectoryName(typeof(object).Assembly.Location), "System.Runtime.dll")),

                // as found out by @Isantipov, for some other reason on .NET Core for Mac and Linux, we need to add this... this is not needed with .NET framework
                MetadataReference.CreateFromFile(Path.Combine(Path.GetDirectoryName(typeof(object).Assembly.Location), "netstandard.dll"))
            };

            if (references != null)
            {
                compilationReferences.AddRange(references);
            }

            SyntaxTree[] syntaxTrees = { CSharpSyntaxTree.ParseText(content) };
            var compilation = CSharpCompilation.Create(dummyAssemblyName,
                options: new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary),
                syntaxTrees: syntaxTrees,
                references: compilationReferences.ToArray());

            Assembly assembly;
            byte[] assemblyBytes;

            using (var ms = new MemoryStream())
            {
                var result = compilation.Emit(ms);

                if (!result.Success)
                {
                    var formatter = new DiagnosticFormatter();
                    var errorMessages = result.Diagnostics
                        .Where(d => d.IsWarningAsError || d.Severity == DiagnosticSeverity.Error)
                        .Select(d => formatter.Format(d));

                    throw new Exception($"Errors encountered whilst compiling assembly: {String.Join(Environment.NewLine, errorMessages)}");
                }

                ms.Seek(0, SeekOrigin.Begin);
                assembly = AssemblyLoadContext.Default.LoadFromStream(ms);

                ms.Seek(0, SeekOrigin.Begin);
                assemblyBytes = ms.ToArray();
            }

            var thisAssemblyReference = MetadataReference.CreateFromStream(new MemoryStream(assemblyBytes));

            var compilationResult = new CompilationResult
            {
                Types = assembly.GetExportedTypes(),
                Assembly = assembly,
                AssemblyBytes = assemblyBytes,
                MetadataReferences = compilationReferences.Union(new[] { thisAssemblyReference })
            };

            return compilationResult;
        }

    }
}