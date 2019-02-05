using Microsoft.CodeAnalysis;

namespace eMailTemplateBuilder.Web.Services
{
    public interface ICSharpCompilationService
    {
        CompilationResult Compile(string content, MetadataReference[] references = null);
    }
}