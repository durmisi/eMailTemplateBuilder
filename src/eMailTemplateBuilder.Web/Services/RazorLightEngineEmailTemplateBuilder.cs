using System;
using System.Linq;
using Newtonsoft.Json;
using RazorLight;

namespace eMailTemplateBuilder.Web.Services
{
    public class RazorLightEngineEmailTemplateBuilder : IEmailTemplateBuilder
    {
        private readonly ICSharpCompilationService _csharpCompilationService;

        public RazorLightEngineEmailTemplateBuilder(ICSharpCompilationService csharpCompilationService)
        {
            _csharpCompilationService = csharpCompilationService;
        }

        public string Build(BuildTemplateModel model)
        {
            try
            {
                //Compile the C# code
                var compilationResult = _csharpCompilationService.Compile(model.Code);
                Type templateModelType;
                if (!string.IsNullOrEmpty(model.TemplateModel))
                {
                    templateModelType = compilationResult.Types.FirstOrDefault(x => x.FullName == model.TemplateModel);
                    if (templateModelType == null)
                    {
                        throw new InvalidOperationException($"A model with name {model.TemplateModel} was not found.");
                    }
                }
                else
                {
                    templateModelType = compilationResult.Types.FirstOrDefault();
                }

                //CHECK does JSON fit to model
                object templateModel;
                try
                {
                    var json = model.Json;
                    templateModel = JsonConvert.DeserializeObject(json, templateModelType);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"The json is not valid. Please check your json model");
                }

                //Try to Build the template
                var engine = new RazorLightEngineBuilder()
                    .AddMetadataReferences(compilationResult.MetadataReferences.ToArray())
                    .UseMemoryCachingProvider()
                    .Build();

                var template = model.Template;
                var result = engine.CompileRenderAsync($"templateKey_{Guid.NewGuid():N}", template, templateModel)
                    .Result;

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }

}