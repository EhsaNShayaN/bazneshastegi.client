import {Directive, ElementRef, Renderer2,} from '@angular/core';

@Directive({
  selector: '[submitLoading]',
  exportAs: 'submitLoading',
  standalone: false
})
export class SubmitLoadingDirective {
  private spinnerEl!: HTMLElement;
  private contentWrapper!: HTMLElement;
  private isLoading = false;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  /*@HostListener('click')
  onClick() {
    if (this.isLoading) return;
    this.startLoading();
  }*/

  startLoading() {
    if (this.isLoading) return;

    const button = this.el.nativeElement as HTMLButtonElement;
    this.isLoading = true;

    // disable button
    this.renderer.setProperty(button, 'disabled', true);
    this.renderer.setStyle(button, 'position', 'relative');

    // wrap original content
    this.contentWrapper = this.renderer.createElement('span');
    this.renderer.setStyle(this.contentWrapper, 'opacity', '0');
    this.renderer.setStyle(this.contentWrapper, 'display', 'inline-flex');

    const children = Array.from(button.childNodes);
    children.forEach(node => this.renderer.appendChild(this.contentWrapper, node));
    this.renderer.appendChild(button, this.contentWrapper);

    // create CSS spinner (similar to mat-spinner)
    this.spinnerEl = this.renderer.createElement('div');
    this.renderer.addClass(this.spinnerEl, 'submit-loading-spinner');

    // Create wrapper for centering
    const spinnerWrapper = this.renderer.createElement('div');
    this.renderer.setStyle(spinnerWrapper, 'position', 'absolute');
    this.renderer.setStyle(spinnerWrapper, 'top', '50%');
    this.renderer.setStyle(spinnerWrapper, 'left', '50%');
    this.renderer.setStyle(spinnerWrapper, 'transform', 'translate(-50%, -50%)');

    this.renderer.setStyle(this.spinnerEl, 'margin-top', '8px');
    this.renderer.setStyle(this.spinnerEl, 'width', '32px');
    this.renderer.setStyle(this.spinnerEl, 'height', '32px');
    this.renderer.setStyle(this.spinnerEl, 'border', '3px solid rgba(255, 255, 255, 0.75)');
    this.renderer.setStyle(this.spinnerEl, 'border-top', '3px solid darkgreen');
    this.renderer.setStyle(this.spinnerEl, 'border-radius', '50%');
    this.renderer.setStyle(this.spinnerEl, 'animation', 'submit-loading-spin 0.8s linear infinite');
    this.renderer.setStyle(this.spinnerEl, 'display', 'inline-block');
    this.renderer.setStyle(this.spinnerEl, 'box-sizing', 'border-box');

    this.renderer.appendChild(spinnerWrapper, this.spinnerEl);
    this.renderer.appendChild(button, spinnerWrapper);

    // Store wrapper reference for cleanup
    (this.spinnerEl as any).wrapper = spinnerWrapper;
  }

  stopLoading() {
    if (!this.isLoading) return;
    const button = this.el.nativeElement as HTMLButtonElement;
    this.isLoading = false;

    this.renderer.setProperty(button, 'disabled', false);

    if (this.spinnerEl) {
      const wrapper = (this.spinnerEl as any).wrapper;
      if (wrapper && wrapper.parentNode === button) {
        this.renderer.removeChild(button, wrapper);
      } else if (this.spinnerEl.parentNode === button) {
        this.renderer.removeChild(button, this.spinnerEl);
      }
    }

    if (this.contentWrapper) {
      const nodes = Array.from(this.contentWrapper.childNodes);
      nodes.forEach(n => this.renderer.appendChild(button, n));
      this.renderer.removeChild(button, this.contentWrapper);
    }
  }
}
