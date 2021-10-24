<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
<#if section = "title">
${msg("loginTitle",(realm.displayName!''))}
<#elseif section = "header">
${msg("Login to your account")}
<#elseif section = "form">
<#if realm.password>
   <form id="kc-form-login" class="flex flex-col pt-3" action="${url.loginAction}" method="post">
      <div class="flex flex-col pt-4">
         <label for="email" class="text-lg">Email</label>
         <input type="email" id="username" name="username" placeholder="Email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div class="flex flex-col pt-4">
         <label for="password" class="text-lg">Password</label>
         <input type="password" id="password"  name="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
      </div>
   <#if realm.rememberMe && !usernameEditDisabled??>
   <div class="flex pt-4">
      <div class="flex w-1/2 justify-start md:justify-start">
         <label>
         <#if login.rememberMe??>
         <input id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
         <#else>
         <input id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
         </#if>
         </label>
      </div>
      <div class="flex w-1/2 justify-end md:justify-end">
         <#if realm.resetPasswordAllowed>
         <span><a class="text-blue-500" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a></span>
         </#if>  
      </div>
   </div>
   </#if>  
      <button class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8" value="${msg('doLogIn')}" type="submit">Submit</button>
   </form>
   <#if social.providers??>
      <div id="social-providers" style="text-align:center;">
         <p><span style="text-align:center;"> or Login With </span></p>
      </div>
      <#list social.providers as p>
      <div style="display: flex; margin-left:20px;">
         <input class="${p.displayName}" 
            style="margin-left:10;margin-right: 10"
            type="button" onclick="location.href='${p.loginUrl}';" value="${p.displayName}"/>
      </div>
      </#list>
   </#if>
   <div class="text-center pt-12 pb-12">
      <p>Don't have an account? <a href="${url.registrationUrl}" class="text-blue-500 underline font-semibold">Register here.</a></p>
   </div>
</#if>
</#if>
</@layout.registrationLayout>