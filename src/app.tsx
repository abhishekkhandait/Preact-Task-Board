import { h, Component } from 'preact';

import { Nav } from "./components/nav";
import { Content } from './components/content';
import { BoardModal } from './modal/board-modal';

import './styles/main.scss';

export const taskUrl = 'http://localhost:3001/tasks/';
export const boardUrl = 'http://localhost:3001/boards/';

export interface AppProps {
}

interface AppState {
    boards: BoardModal[]
}

export class App extends Component<AppProps, AppState> {

    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    async getBoards() {
        return await fetch(boardUrl)
            .then((res) => res.json())
            .then((_boards: BoardModal[]) => this.setState({ boards: _boards }))
        //return _boards;
    }

    componentDidMount() {
        this.getBoards();
    }

    render() {
        return (
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Nav heading="Kanban Board"></Nav>
                <Content boards={this.state.boards ? this.state.boards : []}></Content>
            </div>
        )
    }
}