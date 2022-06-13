import { Component } from "@angular/core";

@Component({
    template: `<div class='page text-center mt-5'><p class='mb-0'><i class='mdi mdi-warning mdi-3x text-danger'></i></p><h3 class='text-danger'>You are not authorized to perform this action.</h3><p>Contact your administrator to get authorized else stay away from bad behaviours.</p></div>`
})
export class UnauthorizedPageComponent { }