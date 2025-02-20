<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* @Mercure/Icon/mercure.svg */
class __TwigTemplate_7dc6221d71ca0e2224d8e5f05b8bcaa2 extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        $__internal_5a27a8ba21ca79b61932376b2fa922d2 = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->enter($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Mercure/Icon/mercure.svg"));

        $__internal_6f47bbe9983af81f1e7450e9a3e3768f = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->enter($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@Mercure/Icon/mercure.svg"));

        // line 1
        yield "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 147.5 144\" fill=\"currentColor\">
\t<path d=\"M72 144c-39.7 0-72-32.3-72-72S32.3 0 72 0s72 32.3 72 72-32.3 72-72 72zM72 6.1C35.7 6.1 6.1 35.7 6.1 72s29.6 65.9 65.9 65.9 66-29.6 66-65.9S108.4 6.1 72 6.1z\"/>
\t<path d=\"M72 14.7a56.5 56.5 0 0 0-49.7 83.4c1.5-1.1 3.1-2.2 4.9-3.3 31-18.5 58.4-33.7 76.6-62 0 0-1.3 32-19.7 46.9-4.1 3.3-7.6 5.9-10.9 8 9.3-4.9 17.4-10.5 23.7-18 0 0-.5 21.5-16.3 31-5.9 3.5-10.8 5.5-15.8 7 9-2 14.9-4.5 19.6-7.7-4 13.3-12.7 20.3-26.2 22.3-4.9.5-9.1-.5-13.5-1.5 8.1 4.5 17.4 7 27.3 7 31.2 0 56.5-25.3 56.5-56.5S103.3 14.7 72 14.7z\"/>
</svg>
";
        
        $__internal_5a27a8ba21ca79b61932376b2fa922d2->leave($__internal_5a27a8ba21ca79b61932376b2fa922d2_prof);

        
        $__internal_6f47bbe9983af81f1e7450e9a3e3768f->leave($__internal_6f47bbe9983af81f1e7450e9a3e3768f_prof);

        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "@Mercure/Icon/mercure.svg";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  48 => 1,);
    }

    public function getSourceContext(): Source
    {
        return new Source("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 147.5 144\" fill=\"currentColor\">
\t<path d=\"M72 144c-39.7 0-72-32.3-72-72S32.3 0 72 0s72 32.3 72 72-32.3 72-72 72zM72 6.1C35.7 6.1 6.1 35.7 6.1 72s29.6 65.9 65.9 65.9 66-29.6 66-65.9S108.4 6.1 72 6.1z\"/>
\t<path d=\"M72 14.7a56.5 56.5 0 0 0-49.7 83.4c1.5-1.1 3.1-2.2 4.9-3.3 31-18.5 58.4-33.7 76.6-62 0 0-1.3 32-19.7 46.9-4.1 3.3-7.6 5.9-10.9 8 9.3-4.9 17.4-10.5 23.7-18 0 0-.5 21.5-16.3 31-5.9 3.5-10.8 5.5-15.8 7 9-2 14.9-4.5 19.6-7.7-4 13.3-12.7 20.3-26.2 22.3-4.9.5-9.1-.5-13.5-1.5 8.1 4.5 17.4 7 27.3 7 31.2 0 56.5-25.3 56.5-56.5S103.3 14.7 72 14.7z\"/>
</svg>
", "@Mercure/Icon/mercure.svg", "C:\\Users\\pepam\\Desktop\\Projekty\\dungeongame-v2\\backend\\vendor\\symfony\\mercure-bundle\\src\\Resources\\views\\Icon\\mercure.svg");
    }
}
