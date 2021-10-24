<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
<#if section = "header">
${msg("Change Password")}
<#elseif section = "form">
   <#if realm.password>
   <form class="flex flex-col pt-3 ${properties.kcFormClass!}" id="kc-reset-password-form" action="${url.loginAction}" method="post">
      <div class="flex flex-col pt-4">
         <label for="password" class="text-lg">Enter your new Password*</label>
         <input type="password" id="password" name="password-new" placeholder="Password" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" >
         <button type="button" id="btnToggle" class="toggle" onclick="passwordCheck()"><i id="eyeIcon" class="fa fa-eye"></i></button>
      </div>
      <div class="flex flex-col pt-4">
         <label for="password" class="text-lg">Confirm your Password*</label>
         <input type="password" id="password-change" name="password-confirm" placeholder="Confirm Password" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" >
         <button type="button" id="btnToggle" class="toggle" onclick="confirm()"><i id="eyeIcon" class="fa fa-eye"></i></button>
      </div>
      <input type="submit" value="${msg('doSubmit')}" tabindex="3" 
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