<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
       ${msg("Forgot your Password?")}
    <#elseif section = "form">
        <#if realm.password>
            <form id="kc-form-login" class="flex flex-col pt-3 ${properties.kcFormClass!}" action="${url.loginAction}" method="post">
                <div class="flex flex-col pt-4">
                    <label for="email" class="text-lg">Enter your email id to which your account is linked.*</label>
                    <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <input type="submit" value="${msg('doSubmit')}" 
                    class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8" />
            </form>  
        <#elseif section = "info" >
            ${msg("emailInstruction")}      
        </#if>
        <div class="text-center pt-12 pb-12">
            <p>Remembered your password? <a href="${url.loginUrl}" class="text-blue-500 underline font-semibold">Log in here</a></p>
            <p>Don't have an account? <a href="${url.registrationUrl}" class="text-blue-500 underline font-semibold">Register here</a></p>
        </div>
    </#if>
</@layout.registrationLayout>