using System;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.CodeAnalysis;

namespace eMailTemplateBuilder.Web.Services
{
    public class CompilationResult
    {
        public IEnumerable<Type> Types { get; set; }

        public byte[] AssemblyBytes { get; set; }

        public Assembly Assembly { get; set; }

        public IEnumerable<MetadataReference> MetadataReferences { get; set; }
    }
}