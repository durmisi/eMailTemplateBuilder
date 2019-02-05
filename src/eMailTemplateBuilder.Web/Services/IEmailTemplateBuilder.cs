namespace eMailTemplateBuilder.Web.Services
{
    public interface IEmailTemplateBuilder
    {
        string Build(BuildTemplateModel model);
    }
}