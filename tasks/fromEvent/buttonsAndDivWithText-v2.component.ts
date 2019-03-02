import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Subject } from "rxjs";
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
  BUTTON_TYPES: ButtonTypes = {
    hello: "hello",
    bye: "bye"
  };

  buttonText: string = "click button for change text";
  button$: Subject<string> = new Subject<string>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit() {
    // or use button$ | async pipe inside template
    this.button$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((buttonText: string) => {
        this.buttonText = buttonText;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
