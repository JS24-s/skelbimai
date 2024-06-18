document.addEventListener("DOMContentLoaded", function() {
    var footerHTML = `
        <footer class="footer mt-auto py-3 bg-secondary">
            <div class="container-fluid">
                <div class="row justify-content-center text-center text-md-start align-items-end">
                    <div class="col-md-4">
                        <p class="mb-0 mx-4 fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"></path>
                            </svg>Darbo valandos: 11-23val.</p>
                        <p class="mb-0 mx-4 fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"></path>
                            </svg>Laisvės al. 00, Kaunas</p>
                        <div style="height: 10px;"></div>
                        <p class="mb-0 d-none d-md-block mx-4 fw-bold"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"></path>
                            </svg>Inforamcija telefonu:</p>
                        <p class="mb-0 d-none d-md-block mx-5">++37066778709</p>
                        <p class="mb-0 d-none d-md-block mx-5">+-37066781577</p>
                    </div>
                    <div class="col-md-4 text-center">
                        <a href="https://www.facebook.com/login" style="font-size: 40px;"><i class="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/" style="font-size: 40px;"><i class="fa fa-twitter"></i></a>
                        <a href="https://lt.linkedin.com/" style="font-size: 40px;"><i class="fa fa-linkedin"></i></a>
                        <a href="https://www.google.com/" style="font-size: 40px;"><i class="fa fa-google-plus"></i></a>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <p class="mb-3 mx-5 fw-bold">&copy;All rights reserved 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
