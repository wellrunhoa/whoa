<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="${url.resourcesPath}/img/favicon.png" type="image/x-icon">
    <#--  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />  -->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');

        .font-family-karla {
            font-family: karla;
        }
    </style>

    <title><#nested "title"></title>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>

<body class="bg-white font-family-karla h-screen">
<#--  <#nested "header">  -->
    <div class="w-full flex flex-wrap">

        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0">
        </div>
        
        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex justify-center md:-mb-7">
                <#--  <a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>  -->
                <img class="h-3/4 w-1/2" src="${url.resourcesPath}/img/whoa-blue.svg" alt="logo">
            </div>
            <div class="flex flex-col text-gray-500 justify-center md:justify-start my-auto md:pt-0 px-8 md:px-24 lg:px-32">
                <div class="text-lg pb-3"><#nested "header"></div>
            
                <#if displayMessage && message?has_content>
                    <#if message.type = 'success'>
                    <div class="flex items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700">
                        <div slot="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle w-5 h-5 mx-2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div class="text-sm font-normal  max-w-full flex-initial">
                            ${message.summary?no_esc}
                        </div>
                    </div>
                    </#if>
                    <#if message.type = 'warning'>
                    <div class="flex items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-yellow-100 bg-yellow-700 border border-yellow-700 ">
                        <div slot="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info w-5 h-5 mx-2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <div class="text-sm font-normal  max-w-full flex-initial">
                            ${message.summary?no_esc}
                        </div>
                    </div>
                    </#if>
                    <#if message.type = 'error'>
                    <div class="flex items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300">
                        <div slot="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon w-5 h-5 mx-2">
                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <div class="text-sm font-normal max-w-full flex-initial">
                            ${message.summary?no_esc}
                        </div>
                    </div>
                    </#if>
                    <#if message.type = 'info'>
                    <div class="flex items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-blue-100 bg-blue-700 border border-blue-700">
                        <div slot="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info w-5 h-5 mx-2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <div class="text-sm font-normal max-w-full flex-initial">
                            ${message.summary?no_esc}
                        </div>
                    </div>
                    </#if>
                </#if>
                <#nested "form">
            </div>
        </div>

    </div>

</body>
</html>
</#macro>
