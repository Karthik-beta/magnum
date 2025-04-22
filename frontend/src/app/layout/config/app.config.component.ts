import { Component, Input, HostListener } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { MenuService } from "../app.menu.service";

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
    styleUrls: ['./app.config.component.scss']
})
export class AppConfigComponent {

    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16, 17, 18];

    // Maually added font size feature
    fontsize: number = 14; // Default font size

    Theme_button!: string;

    constructor(public layoutService: LayoutService, public menuService: MenuService) {
        // Initialize font size from localStorage if available
        const storedFontSize = localStorage.getItem('fontSize');
        if (storedFontSize) {
            this.fontsize = parseInt(storedFontSize, 10);
            this.applyFontsize();
        }
    }

     decrementFontsize() {
        this.fontsize--;
        this.applyFontsize();
        this.saveFontSizeToLocalStorage();
    }

    incrementFontsize() {
        this.fontsize++;
        this.applyFontsize();
        this.saveFontSizeToLocalStorage();
    }

    applyFontsize() {
        document.documentElement.style.fontSize = this.fontsize + 'px';
        console.log('Font size: ' + this.fontsize);
    }

    saveFontSizeToLocalStorage() {
        localStorage.setItem('fontSize', this.fontsize.toString());
    }



    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }


    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // Check if the event target is not an input or textarea to avoid conflicts
        if (!(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
            // Handle keyboard shortcuts
            switch (event.key) {
                case '-':
                case '_':
                    this.decrementScale();
                    break;
                case '=':
                case '+':
                    this.incrementScale();
                    break;
                // Add more cases for other shortcuts if needed
            }
        }
    }



}
