import angular from 'angular';
import pdfjsDist from 'pdfjs-dist';

let pdfjs;
if(pdfjsDist) pdfjs = pdfjsDist.PDFJS;

export default angular
    .module('ngPdf', [])
    .component('ngPdf', {
        template: `
            <style>
                .ng-pdf-container {
                    background-color: rgb(82, 86, 89);
                    padding: 60px 5px 5px 5px;
                    text-align: center;
                    position: relative;
                }

                .ng-pdf-header {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 50px;
                    line-height: 50px;                
                    width: 100%;
                    background-color: rgb(50, 54, 57);
                    color: rgb(241, 241, 241);
                    font-size: 0.9em;
                    font-family: Helvetica;
                    box-shadow: 0px 0px 10px #000;                
                }

                .ng-pdf-button {
                    background-color: transparent;
                    border: none;
                    color: #fff;
                    font-size: 1.5em;
                    outline: none;
                    cursor: pointer;
                    line-height: 45px;
                }

                .ng-pdf-button-right {
                    float: right;
                }

                .ng-pdf-button-left {
                    float: left;
                }

                .ng-pdf-page {
                    max-width: 100%;
                    box-shadow: 0px 0px 10px #000;
                    background-color: #fff;
                }
            </style>
            <div class="ng-pdf-container">
                <div class="ng-pdf-header">
                    <button
                        class="ng-pdf-button ng-pdf-button-left"
                        ng-click="$ctrl.changePage($ctrl.page - 1)"
                        ng-disabled="$ctrl.loading || $ctrl.page == 1">
                        &#9668;
                    </button>
                    <span ng-if="!$ctrl.loading">{{$ctrl.page}} / {{$ctrl.pdf.numPages}}</span>
                    <span ng-if="$ctrl.loading">Loading</span>                
                    <button
                        class="ng-pdf-button ng-pdf-button-right"                
                        ng-click="$ctrl.changePage($ctrl.page + 1)"
                        ng-disabled="$ctrl.loading || $ctrl.page == $ctrl.pdf.numPages">
                        &#9658;
                    </button>
                </div>
                <canvas class="ng-pdf-page" ng-show="!$ctrl.loading"></canvas>
            </div>
        `,
        controller: function ($element, $timeout) {
            const $ctrl = this;
            let canvas = null;

            // PDF Functions
            const getPDF = url => {
                return new Promise((resolve, reject) => {
                    pdfjs.getDocument(url).then(pdf => {
                        resolve(pdf);
                    });
                });
            }

            const getPage = (pdf, n) => {
                return new Promise((resolve, reject) => {
                    pdf.getPage(n).then(page => {
                        resolve(page);
                    });
                });
            }

            const renderPage = (page, canvas) => {
                return new Promise((resolve, reject) => {
                    var viewport = page.getViewport(1.0);
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    var ctx = canvas.getContext('2d');
                    page.render({
                        canvasContext: ctx,
                        viewport: viewport
                    }).then(() => resolve());
                });
            }

            // Controls
            $ctrl.changePage = n => {
                $ctrl.page = n;
                $ctrl.loading = true;
                getPage($ctrl.pdf, n).then(page => {
                    renderPage(page, canvas).then(() => {
                        $timeout(() => {
                            $ctrl.loading = false;
                        });
                    });
                });
            }

            $ctrl.$onInit = function () {
                if(window.PDFJS) {
                    pdfjs = window.PDFJS;
                }

                if (!pdfjs) {
                    console.error("[ngPdf] PDF.js is not loaded");
                    return;
                }             

                pdfjs.disableWorker = true;
                $ctrl.loading = true;
                $ctrl.page = 0;
                canvas = $element.find("canvas")[0];
                getPDF("sample.pdf").then(pdf => {
                    $timeout(() => {
                        $ctrl.pdf = pdf;
                        $ctrl.changePage(1);
                    });
                });
            }
        }
    })
    .name;;