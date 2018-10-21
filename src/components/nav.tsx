import { h, Component } from "preact";

export interface NavProps {
    heading: string
}

interface NavState {
    heading: string
}

export class Nav extends Component<NavProps, NavState> {
    constructor(props: NavProps) {
        super(props);
    }

    render(props: NavProps, state: NavProps) {
        return (
            <header class="mdl-header__header main-header">
                <div class="mdl-header__header-row">
                    <span class="mdl-layout-title">{props.heading}</span>
                </div>
            </header>
        )
    }
}