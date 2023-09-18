<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
    <!-- main title -->
    <div class="container-fluid bg-light text-dark d-flex justify-content-center py-4">
        <h1 class="fw-light"><span class="fw-bold fs-1">Skill<span class="fw-bold text-secondary">Net</span> :</span> Style Guide</h1>
    </div>

    <!-- colors -->
    <div class="container-fluid py-4 mb-5">
        <h2 class="text-center bg-dark text-light p-2 rounded">Colors</h2>

        <div class="text-center row d-flex mt-4 gx-3 justify-content-evenly">
            <h4>Main Background Colors</h4>
            <div class="col-sm-2 py-2 rounded bg-light"><p>bg-light</p></div>
            <div class="col-sm-2 py-2 rounded bg-white border border-dark border-2"><p>bg-white</p></div>
            <div class="col-sm-2 py-2 rounded bg-dark text-light"><p>bg-dark<br><i>(w text-light)</i></p></div>
            <div class="col-sm-2 py-2 rounded bg-extra-dark text-light"><p>bg-extra-dark<br><i>(w text-light)</i></p></div>
        </div>
        
        <div class="text-center row d-flex mt-4 justify-content-evenly">
            <h4>Main Accent Colors</h4>
            <div class="col-sm-2 py-2 rounded"></div>
            <div class="col-sm-2 py-2 rounded bg-primary text-light"><p>bg-primary<br><i>(w text-light)</i></p></div>
            <div class="col-sm-2 py-2 rounded bg-secondary"><p>bg-secondary</p></div>
            <div class="col-sm-2 py-2 rounded"></div>
        </div>

        <div class="text-center row mt-3 d-flex mt-4 justify-content-evenly">
            <h4>Other Colors</h4>
            <div class="col-sm-2 py-2 mb-5 rounded bg-info"><p>bg-info</p></div>
            <div class="col-sm-2 py-2 mb-5 rounded bg-success"><p>bg-success</p></div>
            <div class="col-sm-2 py-2 mb-5 rounded bg-warning text-light"><p>bg-warning<br><i>(w text-light)</i></p></div>
            <div class="col-sm-2 py-2 mb-5 rounded bg-danger text-light"><p>bg-danger<br><i>(w text-light)</i></p></div>
        </div>

        <h3 class="text-center bg-dark text-light w-50 m-auto rounded mt-5 mb-4">Color percentages</h3>

        <p class="text-center fw-bold">Try to keep to the main bg and accent colors and only use "Other Colors" when absolutely necessary</p>

        <div class="progress mx-2" style="height: 2rem;">
            <div class="progress-bar bg-light text-dark fw-semibold" style="width: 65%">Light or White</div>
            <div class="progress-bar bg-dark" style="width: 15%">Dark or Extra Dark</div>
            <div class="progress-bar bg-primary" style="width: 15%">Primary</div>
            <div class="progress-bar bg-secondary" style="width: 5%">Secondary</div>
        </div>

        <h3 class="text-center bg-dark text-light w-50 m-auto rounded mt-5 mb-4">Inspiration</h3>

        <div class="row">
            <div class="col">
                <img src="https://cdn.dribbble.com/users/1774675/screenshots/9709391/media/f7ece8b676a04295a7aeb94467014426.png" class="w-100" />
            </div>
            <div class="col">
                <img src="https://cdn.dribbble.com/users/2117939/screenshots/9070601/media/8aba45cef5ac84ced95bce86f61e79e1.png?resize=1200x900&vertical=center" class="w-100" />
            </div>
            <div class="col">
                <img src="https://cdn.dribbble.com/users/78806/screenshots/8369503/media/8180fd078807bab2077ec60eca461ca8.png?resize=1200x900&vertical=center" class="w-100" />
            </div>
        </div>
    </div>

    <!-- buttons -->
    <div class="container-fluid pb-4 mb-5">
        <h2 class="text-center bg-dark text-light p-2 rounded">Buttons</h2>

        <div class="row mt-4">
            <h4 class="text-center">Main buttons</h4>
            <div class="col-sm-3 d-flex justify-content-center">
                <button class="btn m-3 btn-primary">btn-primary</button>
            </div>
            <div class="col-sm-3 d-flex justify-content-center">
                <button class="btn m-3 btn-secondary">btn-secondary</button>
            </div>
            <div class="col-sm-3 d-flex justify-content-center">
                <button class="btn m-3 btn-light">btn-light</button>
            </div>
            <div class="col-sm-3 d-flex justify-content-center">
                <button class="btn btn-dark m-3">btn-dark</button>
            </div>
        </div>
    </div>

    <!-- FontAwesome icons -->
    <div class="container-fluid pb-4 mb-5">
        <h2 class="text-center bg-dark text-light p-2 rounded">Font Awesome Icons</h2>

        <p class="mt-4">To add icons using Font Awesome, go to <a style="font-weight: bold;" href="https://fontawesome.com/search?o=r&m=free" target="_blank">https://fontawesome.com/icons</a> and search for the icon you want</p>

        <p>Remember to click the <span class="text-primary" style="font-weight: bold;"><i class="fa-solid fa-bolt"></i>Free</span> button (paid ones don't work)</p>

        <br>

        <p><span class="fw-bold text-secondary">Step 1: </span> Copy the <span class="text-primary fw-bold">Vue.js</span> code snippet and paste in HTML document: (eg. '<span class="text-primary" style="font-weight: bold;">&lt;font-awesome-icon icon="fa-solid fa-circle-user" /&gt;</span>')</p>

        <p><span class="fw-bold text-secondary">Step 2: </span> Go to <span class="text-primary fw-bold">src/main.js</span> and add the icon you want to use to <span class="text-primary fw-bold">library.add()</span> <i>[type in camelCase]</i></p>

        <p><span class="fw-bold text-secondary">Step 3: </span> Ensure Font Awesome import statement is in your vue component:<br>
            <code class="bg-light">
                &lt;script setup&gt;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'<br>
                &lt;/script&gt;
            </code>
        </p> 

        <div class="row text-dark">
            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-circle-user" size="4x" class="mb-4" />
                <p>fa-solid fa-circle-user</p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-house-chimney" size="4x" class="mb-4" />
                <p>fa-solid fa-house-chimney</p>
            </div>
            
            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-earth-africa" size="4x" class="mb-4" />
                <p>fa-solid fa-earth-africa</p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-shrimp" size="4x" class="mb-4" />
                <p>fa-solid fa-shrimp</p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-hamsa" size="4x" class="mb-4" />
                <p>fa-solid fa-hamsa</p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-wheat-awn" size="4x" class="mb-4" />
                <p>fa-solid fa-wheat-awn</p>
            </div>
        </div>

        <h3 class="text-center bg-dark text-light w-50 m-auto rounded mb-4">Colors</h3>
        <p class="text-center">To change colors, apply "text-<span class="text-primary">(color tag)</span>" class.</p>

        <div class="row text-dark">
            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-circle-user" size="4x" class="mb-4 text-primary" />
                <p><span class="text-primary" style="font-weight: bold;">text-primary</span></p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-house-chimney" size="4x" class="mb-4 text-secondary" />
                <p><span class="text-secondary" style="font-weight: bold;">text-secondary</span></p>
            </div>
            
            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-earth-africa" size="4x" class="mb-4 text-dark" />
                <p><span class="text-dark" style="font-weight: bold;">text-dark</span></p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-shrimp" size="4x" class="mb-4 text-extra-dark" />
                <p><span class="text-extra-dark" style="font-weight: bold;">text-extra-dark</span></p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-hamsa" size="4x" class="mb-4 text-info" />
                <p><span class="text-info" style="font-weight: bold;">text-info</span></p>
            </div>

            <div class="col-sm-2 col-4 d-flex align-items-center text-center my-5 flex-column">
                <font-awesome-icon icon="fa-solid fa-wheat-awn" size="4x" class="mb-4 text-danger" />
                <p><span class="text-danger" style="font-weight: bold;">text-danger</span></p>
            </div>
        </div>

        <h3 class="text-center bg-dark text-light w-50 m-auto rounded mb-4">Sizing & Misc Styling</h3>
        <p class="text-center">Visit <a href="https://fontawesome.com/docs/web/use-with/vue/style" target="_blank" class="text-primary fw-bold">fontawesome.com/docs/web/use-with/vue/style</a> for full Vue.js Font Awesome documentation.</p>
    </div>

    <!-- FontAwesome icons -->
    <div class="container-fluid pb-4 mb-5">
        <h2 class="text-center bg-dark text-light p-2 rounded">New CSS Stylings</h2>
        <h3 class="text-center">These should go directly into src/assests/main.css</h3>
    </div>
</template>
