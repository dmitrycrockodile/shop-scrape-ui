<template>
   <section class="error-page flex-grow-1">
      <div class="container">
         <div class="row align-items-center justify-content-center">
            <div class="col-xl-12">
               <div class="error-page__inner text-center pt-60 pb-120">
                  <div class="thumb wow fadeInUp animated pb-4"> 
                     <img class="error-page__img" src="@/assets/img/inner-pages/notFoundImage.png" alt="NotFound">
                  </div>
                  <div class="error-page__content wow fadeInUp animated">
                     <h3>Oops! That page can’t be found.</h3>
                     <p>
                        It looks like nothing was found at this location. 
                        Maybe try one of the links below or a search?
                     </p>
                     <div class="btn-box"> 
                        <router-link :to="{ name: 'Dashboard' }" class="btn--primary style2">Go to Dashboard</router-link> 
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
  </section>
</template>

<script>
   export default {
      
   }
</script>

<style>
.error-page__img {
   width: auto;
   height: 350px;
   border-radius: 20px;
}
</style>