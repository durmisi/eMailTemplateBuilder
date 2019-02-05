using eMailTemplateBuilder.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace eMailTemplateBuilder.Web.Controllers
{
    [Route("api/templates")]
    public class EmailTemplatesController : Controller
    {
        private readonly IEmailTemplateBuilder _emailTemplateBuilder;

        public EmailTemplatesController(IEmailTemplateBuilder emailTemplateBuilder)
        {
            _emailTemplateBuilder = emailTemplateBuilder;
        }

        [HttpPost("build")]
        public IActionResult Build([FromBody]BuildTemplateModel model)
        {
            var buildResult = _emailTemplateBuilder.Build(model);

            return new ContentResult()
            {
                Content = buildResult,
                ContentType = "text/html",
            };
        }

    }   
}