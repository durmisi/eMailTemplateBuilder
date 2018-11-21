using Microsoft.CodeAnalysis;

namespace NGXSoft.EmailSystem.Services.EmailTemplates
{
    public interface ICSharpCompilationService
    {
        CompilationResult Compile(string content, MetadataReference[] references = null);
    }
}