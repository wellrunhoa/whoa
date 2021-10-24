<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
        ${msg("confirmLinkIdpTitle")}
    <#elseif section = "form">
        <form id="kc-register-login" class="flex flex-col pt-3 ${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <button type="submit" class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8 ${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" name="submitAction" id="updateProfile" value="updateProfile">${msg("confirmLinkIdpReviewProfile")}</button>
            <button type="submit" class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8 ${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" name="submitAction" id="linkAccount" value="linkAccount">${msg("confirmLinkIdpContinue", idpAlias)}</button>
        </form>
    </#if>
</@layout.registrationLayout>