import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NovelsService } from "../../providers/novels-service";
import { Chapter } from "../../common/models/chapter";
import { ChaptersService } from "../../providers/chapters-service";

@IonicPage()
@Component({
  selector: "ln-chapter-list",
  templateUrl: "ln-chapter-list.html",
})
export class LnChapterListPage {
  chapters: Chapter[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public novelService: NovelsService,
    public chaptersService: ChaptersService) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LnChapterListPage");
    let id = this.navParams.data;
    this.novelService
      .getNovelChapterList(id)
      .subscribe((chapters: Chapter[]) => {
        chapters.forEach(chapter => {
          this.checkIfChapterIsRead(chapter);
        });
        this.chapters = chapters;
      });
  }

  checkIfChapterIsRead(chapter) {
    this.chaptersService
      .isRead(chapter)
      .then((isRead) => {
        chapter.isRead = isRead;
      });
  }

  openChapter(chapter) {
    // put settimeout to hide the animation to the user
    setTimeout(() => {
      chapter.isRead = true;
    }, 500);
    this.navCtrl.push('LnChapterPage', {
      novelId: this.navParams.data,
      chapterNumber: chapter.number
    });
  }

}
