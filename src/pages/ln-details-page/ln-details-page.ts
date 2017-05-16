import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Novel, EmptyNovel } from '../../common/models/novel';
import { NovelsService } from '../../providers/novels-service';

@IonicPage()
@Component({
  selector: 'page-ln-details-page',
  templateUrl: 'ln-details-page.html',
})
export class LnDetailsPage {
  novel: Novel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public novelsService: NovelsService) {
    // this.novel = new EmptyNovel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LnDetailsPage', this.novel);
    let id = this.navParams.data;
    this.novelsService.getNovel(id).subscribe((novel: Novel) => {
      console.log("ionVIewDidLoad", novel);
      this.novel = novel;
    })
  }

  get formattedSynopsisText() {
    if (this.novel) {
      let content = this.novel.synopsis.trim();
      content = '&emsp;' + content.replace(/\n/g, "<br>&emsp;");
      return content;
    }
    return "";
  }

  get formattedGenre() {
    if (this.novel) {
      let genres = this.novel.genres.map(genre => genre.name)
      return genres.join(", ");
    }
    return "";
  }

  startReading() {
    this.continueReading(1);
  }

  continueReading(chapter) {
    this.navCtrl.push('LnChapterPage', {
      novelId: this.novel.id,
      chapterNumber: chapter
    });
  }
}
