import { Component, ViewChild, HostListener, ElementRef, Inject, OnInit } from '@angular/core';
// import {WebView, LoadEventData} from 'ui/web-view';
import { ElectronService } from 'ngx-electron';
import { Directive } from '@angular/core';

import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  url = 'https://gmail.com';
  isLoading = true;

  configData: any;
  selectedTheme: any;

  private ipc: IpcRenderer;
  showmenu = true;

  myfb = false;
  mytwit = false;
  mygoogle = true;
  mylink = false;
  myyou = false;
  myinsta = false;
  mypt = false;
  mywp = false;
  mymeet = false;
  myclndr = false;
  mylnkd = false;


  constructor(private myElectronService: ElectronService) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }

  }
  // constructor(private page: Page) {
  //   this.page.actionBarHidden = true;
  // }

  onLoadStart() {
    this.isLoading = true;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    setTimeout(() => {

    }, 0);
  }

  logArchitecture() {
    if (this.myElectronService.isElectronApp) {
      console.log(this.myElectronService.process.arch);
    }
  }


  ngOnInit() {
    this.logArchitecture();
  }

  openModal(key) {
    this.showmenu = false;

    this.myfb = false;
    this.mytwit = false;
    this.mygoogle = false;
    this.mylnkd = false;
    this.myyou = false;
    this.myinsta = false;
    this.mypt = false;
    this.mywp = false;
    this.mymeet = false;
    this.myclndr = false;
    switch (key) {
      case 'gmail':
        this.url = 'https://gmail.com';
        this.mygoogle = false;
        break;
      case 'calander':
        this.url = 'https://calendar.google.com/calendar/r';
        this.myclndr = true;
        break;
      case 'fb':
        this.url = 'https://facebook.com';
        this.myfb = true;
        break;
      case 'webwhatsup':
        // tslint:disable-next-line:max-line-length
        this.url = 'https://web.whatsapp.com';
        this.mywp = true;
        break;
      case 'twitter':
        this.url = 'https://twitter.com';
        this.mytwit = true;
        break;
      case 'googlemeet':
        this.url = 'https://meet.google.com';
        this.mymeet = true;
        break;
      case 'youtube':
        this.url = 'https://www.youtube.com';
        this.myyou = true;
        break;
      case 'linkedin':
        this.url = 'https://www.linkedin.com';
        this.mylnkd = true;
        break;

      case 'instagram':
        this.url = 'https://www.instagram.com';
        this.myinsta = true;
        break;

      case 'pinterest':
        this.url = 'https://in.pinterest.com/';
        this.mypt = true;
        break;

      case 'calendar':
        this.url = 'https://calendar.google.com/calendar/';
        this.mypt = true;
        break;
    }
    this.showmenu = true;
  }

}
