<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
<#if section = "title">
${msg("registerTitle")}
<#elseif section = "header">
${msg("Register")}
<#elseif section = "form">
      <#if realm.password>
         <form class="flex flex-col pt-3" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
            <div class="flex flex-col pt-4">
               <#--  <label for="name" class="text-lg">First Name*</label>  -->
               <input type="text" id="firstName" name="firstName" placeholder="First Name*" 
                  required oninvalid="this.setCustomValidity('Enter your First Name')" oninput="this.setCustomValidity('')" 
                  value="${(register.formData.firstName!'')}" tabindex="1" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
               <#--  <label for="name" class="text-lg">Last Name*</label>  -->
               <input type="text" id="lastName" name="lastName" placeholder="Last Name*" 
                  required oninvalid="this.setCustomValidity('Enter your Last Name')" oninput="this.setCustomValidity('')" 
                  value="${(register.formData.lastName!'')}" tabindex="1" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
               <#--  <label for="email" class="text-lg">${msg("Email*")}</label>  -->
               <input type="email" id="email" name="email" placeholder="${msg('Email*')}" required oninvalid="this.setCustomValidity('Enter your email id')"
                  oninput="this.setCustomValidity('')" value="${(register.formData.email!'')}" autocomplete="email" 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <#if !realm.registrationEmailAsUsername>
               <div class="flex flex-col pt-4">
                  <#--  <label for="username" class="text-lg">${msg("username")}</label>  -->
                  <input type="text" id="username" name="username" placeholder="${msg('username')}" required oninvalid="this.setCustomValidity('Enter your email id')"
                     oninput="this.setCustomValidity('')" value="${(register.formData.username!'')}" autocomplete="username" 
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
               </div>
            </#if>
            <#if passwordRequired>
               <div class="flex flex-col pt-4">
                  <#--  <label for="password" class="text-lg">${msg("Password*")}</label>  -->
                  <input type="password" id="password" name="password" placeholder="${msg('Password*')}" required oninvalid="this.setCustomValidity('Enter your password')"
                     oninput="this.setCustomValidity('')" value="${(register.formData.password!'')}"  autocomplete="new-password"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
               </div>

               <div class="flex flex-col pt-4">
                  <#--  <label for="confirm-password" class="text-lg">${msg("passwordConfirm")}</label>  -->
                  <input type="password" id="password-confirm" name="password-confirm" placeholder="${msg('passwordConfirm')}" required oninvalid="this.setCustomValidity('Enter your confirmpassword')"
                     oninput="this.setCustomValidity('')" value="${(register.formData.firstName!'')}"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
               </div>
            </#if>
            <div class="flex flex-col pt-4">
               <label for="rememberMe" class="text-lg"><input id="rememberMe" name="rememberMe" type="checkbox" checked/> ${msg("accept")} <a class="text-blue-500" href="#" >terms and conditions</a></label>
            </div>
            <input type="submit" value="${msg('doRegister')}" tabindex="3" 
               class="bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 p-2 mt-8" />
         </form>
      </#if>
      <#if social.providers??>
         <div id="social-providers" class="text-center pt-12 pb-12">
            <p><span class="text-center"> or Register With </span></p>
         </div>
         <#list social.providers as p>
            <div class="flex ml-10">
               <input class="${p.displayName} ml-10 mr-10"
                  type="button" onclick="location.href='${p.loginUrl}';" value="${p.displayName}"/>
            </div>
         </#list>
      </#if>
      <div class="text-center pt-8 pb-12">
         <p>Already have an account? <a href="${url.loginUrl}" class="text-blue-500 underline font-semibold">Log in here.</a></p>
      </div>
</#if>
</@layout.registrationLayout>