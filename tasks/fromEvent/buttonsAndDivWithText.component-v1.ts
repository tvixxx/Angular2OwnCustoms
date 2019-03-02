import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

interface ButtonTypes {
  hello: string;
  bye: string;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  buttonClicked: string = "click button for change text";
  BUTTON_TYPES: ButtonTypes = {
    hello: "hello",
    bye: "bye"
  };

  private unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild("helloButton")
  helloButton: ElementRef;

  @ViewChild("byeButton")
  byeButton: ElementRef;

  ngOnInit() {
    this.initHelloButtonStream$();
    this.initByeButtonStream$();
  }

  initHelloButtonStream$(): void {
    fromEvent(this.helloButton.nativeElement, "click")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.buttonClicked = this.BUTTON_TYPES.hello;
      });
  }

  initByeButtonStream$(): void {
    fromEvent(this.byeButton.nativeElement, "click")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.buttonClicked = this.BUTTON_TYPES.bye;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
