<template>
    <div class=" d-flex flex-column align-items-center w-100">
        <div class="header w-100">
        Future header up here
        </div>
        <div class="w-75">
      <!-- Header -->

     
        <div class="card" >
        <div class="card-body">
            <div class="row pb-5">
                <div class="col-1">
                    <img class="profilePic" src="applicant.profilePicture">
                </div>

                <div class="col-2">
                    <h3 class="card-title ">{{ applicant.name }}</h3>
                </div>

                <div class="col-1 d-flex justify-content-end">
                    <div class="vr bg-secondary opacity-100" style="width:5px; height: 60px; border-radius:3px"></div>
                </div>
                
                <div class="col-5">
                    <h5 class="card-title ">{{ applicant.position }}</h5>
                    <div class="row">
                        <p class="card-title ">{{ applicant.department }} Department, {{ applicant.country }}</p>
                    </div>

                </div>
              
            </div>

            <div class="row pb-5">
              <div class="col-6"> 
                <h4> Current Skills </h4>
                <div v-for="skill in job.applicantSkills" :key="skill" class="d-inline">
                    <span class="badge bg-primary me-2 p-2 ps-3 pe-3">{{ skill }} </span>
                </div>
              </div>

              <div class="col-6">
                <div class="progress-bar" :style="getProgressBarStyle(applicant.matchPercentage)">
                <div class="progress-text"> {{ applicant.matchPercentage }}%
                <span class="match-text">Match</span>
          </div>
        </div>
              </div>
            </div>

            <div class="row pb-5">
              <div class="col-6"> 
                <h4> Required Skills </h4>
                <div v-for="skill in job.jobSkills" :key="skill" class="d-inline">
                    <span v-if="job.applicantSkills.includes(skill)">
                      <span class="badge bg-primary me-2 p-2 ps-3 pe-3">{{ skill }} </span>
                    </span>

                    <span v-else>
                      <span class="badge bg-light me-2 p-2 ps-3 pe-3">{{ skill }} </span>
                    </span>
                    
                </div>
              </div>
            </div>

            <div class="row pt-5 mb-5">
              <div class="col"> 
                <button type="button" class="btn btn-secondary w-50 text-light"> 
                  Download Resume 
                </button>
                
              </div>
            </div>
            
        </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        applicant: 
          {
            name: 'Seth Yap',
            position: 'Lead Product Designer',
            profilePicture: 'profile.jpg',
            matchPercentage: 67,
            department: 'Tech',
            country: 'Singapore'
          },

        job:
        {
          applicantSkills: ['Figma', 'Wireframing', 'HTML', 'CSS'],
          jobSkills:['Figma', 'Wireframing', 'HTML', 'CSS', 'Javascript', 'React']
        }
          
      };
    },
    methods: {
      handleCardClick(index) {
        // Handle card click event, e.g., navigate to the applicant's details page
        console.log(`Clicked on card ${index}`);
      },
      getProgressBarStyle(matchPercentage) {
        // Determine the color of the progress bar based on matchPercentage
          return {
            
            background: `
            radial-gradient(closest-side, white 79%, transparent 80% 100%),
            conic-gradient(#6A44D4 ${matchPercentage}% , #b3b3b3 0)`,
          };
        }
      },
    };
  </script>
  
  
   <style scoped>
   .header {
     font-family: 'montserrat-bold';
     font-size: 30px;
     margin-left: 40px;
     padding: 10px;
   }

   
   .card {
     display: flex;
     flex-direction: row;
     align-items: center;
     margin: 10px;
     padding: 20px;
     border: 1px solid #ccc;
     background-color: #ffffff;
     border-radius: 5px;
     flex: 1;
     width: 100%;
     transition: background-color 0.3s, color 0.3s;
     cursor: pointer;
     color: black;
   }
   
  
   
   .profilePic{
    border-radius: 50%;
    height: 50px;
    width: 50px
   }
   
   
 .progress-bar {
   width: 120px;
   height: 120px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 14px;
   color: black;
   position: relative;
   margin-bottom: 5px;
 }
 
 .progress-text {
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   font-family: 'montserrat-bold';
 }

   </style>
   