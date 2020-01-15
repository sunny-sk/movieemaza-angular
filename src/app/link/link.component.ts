import { fade } from '../../animations/animations'
import { Link } from './../model/link.model';
import { LinkService } from './../services/link.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
  animations:[
    fade
  ]
})
export class LinkComponent implements OnInit {

  downloadLink: Link[] = [];
  isLoading: boolean = true;
  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.linkService.getAllDownloadLink().subscribe((data) => {
      this.isLoading = false;
      data.forEach(data => {
        this.downloadLink.unshift(data);
      })

    }, (error) => {
      this.isLoading = false;
      console.log(error);
    })
  }


}





