namespace NGXSoft.EmailSystem.Services.EmailTemplates
{
    public interface IEmailTemplateBuilder
    {
        string Build(BuildTemplateModel model);
    }
}