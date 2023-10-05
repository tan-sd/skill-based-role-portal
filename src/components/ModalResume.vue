
<template>
    <!-- Modal -->
    <div class="modal fade" id="ModalInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">Apply to: <h4 style="padding-left: 15px;display: inline-flex;">Lead Product Designer</h4></h4>
                <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal">
               
                </button>
            </div>
            <div class="modal-body">
                <div class="p-3 container">
                    <div class="row">
                        <h5 class="pb-2">Your information</h5>
                    </div>
                    <div class="row">
                        <div class="col-3 float-right">
                            <h5><img class="profilePic" src="applicant.profilePicture" /> </h5>
                        </div>
                        <div class="col-9 pt-2" style="font-family: Montserrat">
                            <p>Alice</p>
                            <p>Alice@gmail.com</p>
                        </div>
                    </div>
                    <div class="pt-4">
                    <h5>Resume</h5>
                    <p style="font-family: Montserrat" >Please include an updated resume</p>
                    <button type="button" class="btn btn-outline-secondary border-3">
                        <span style="font-family: Montserrat">Upload Resume</span>
                    </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" >Submit</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style>
.profilePic {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  float: center;
}

#ModalInfo{
    font-family: 'Montserrat-bold';
}
</style>