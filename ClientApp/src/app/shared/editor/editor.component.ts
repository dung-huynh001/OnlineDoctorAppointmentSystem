import { Component, OnInit } from '@angular/core';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  // public Editor = DecoupledEditor;

  // public onReady( editor: DecoupledEditor ): void {
  //   const element = editor.ui.getEditableElement()!;
  //   const parent = element.parentElement!;s

  //   parent.insertBefore(
  //     editor.ui.view.toolbar.element!,
  //     element
  //   );
  // }

  constructor() {

  }
  

  ngOnInit(): void {

  }
}
