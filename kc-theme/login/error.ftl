<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
        ${msg("errorTitle")}
    <#elseif section = "form">
        <div id="kc-error-message" class="text-center pt-12 pb-12">
            <p class="instruction">${message.summary}</p>
            <#if client?? && client.baseUrl?has_content>
                <p><a id="backToApplication" class="text-blue-500" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>