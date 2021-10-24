<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    
        <#--  ${msg("emailVerifyTitle")}  -->
    <#if section = "header">  
    ${msg("Email Verification")}
    <#elseif section = "form">    
    <div class="text-center pt-12 pb-12">
        <p>${msg("emailVerifyInstruction1")}</p>
        <p>${msg("emailVerifyInstruction2")}</p>
    </div>   
    <div class="text-center pt-12 pb-12">
        <p>Click here to re-send the email</p>
        <a href="${url.loginAction}"> 
            <button class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8">Re-Send</button>
        </a>
    </div>
    </#if>
</@layout.registrationLayout>