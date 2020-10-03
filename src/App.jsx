import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Heart from './components/Heart';
import Ball from './components/Ball';
import Box from './components/Box';
import Bot from './components/Bot';
import Hagfish from './components/Hagfish';
import Building from './components/Building';
import Building2 from './components/Building2';
import Ballet from './components/Ballet';
import Body from './components/Body';
import Puzzle from './components/Puzzle';
import TextPoint from './components/TextPoint';
import Boxxxx from './components/Boxxxx';
import Euclid from './components/Euclid';
import Day20190909 from './components/daies/20190909';
import Day20190910 from './components/daies/20190910';
import Day20190912 from './components/daies/20190912';
import Day20190913 from './components/daies/20190913';
import Liquid from './components/Liquid';
import StyleTrans from './components/StyleTrans';
import { tyuusyouganomosya, araanatakashira, ayamarenaihito, gaynosekkyou, honninnokao, nastarienai, guuzennniyogore } from './constants';


export default () => {
    return (
        <Router>
            <Route exact path='/' component={Home} />
            <Route path='/heart' render={props => <Heart url={ayamarenaihito} {...props} />} />
            <Route path='/ball' render={props => <Ball url={tyuusyouganomosya} {...props} />} />
            <Route path='/box' render={props => <Box url={araanatakashira} {...props} />} />
            <Route path='/bot' render={props => <Bot url={gaynosekkyou} {...props} />} />
            <Route path='/hagfish' render={props => <Hagfish url={honninnokao} {...props} />} />
            <Route path='/building' render={props => <Building url={nastarienai} {...props} />} />
            <Route path='/building2' render={props => <Building2 url={araanatakashira} {...props} />} />
            <Route path='/ballet' render={props => <Ballet {...props} />} />
            <Route path='/body' render={props => <Body {...props} />} />
            <Route path='/puzzle' render={props => <Puzzle {...props} />} />
            <Route path='/textPoint' render={props => <TextPoint {...props} />} />
            <Route path='/boxxxx' render={props => <Boxxxx url={nastarienai} {...props} />} />
            <Route path='/euclid'>
                <Euclid />
            </Route>
            <Route path='/liquid'>
                <Liquid url={guuzennniyogore} />
            </Route>
            <Route path='/styletrans'>
                <StyleTrans />
            </Route>
            <Route path='/20190909' render={props => <Day20190909 {...props} />}></Route>
            <Route path='/20190909' render={props => <Day20190909 {...props} />}></Route>
            <Route path='/20190910' render={props => <Day20190910 {...props} />}></Route>
            <Route path='/20190912' render={props => <Day20190912 {...props} />}></Route>
            <Route path='/20190913' render={props => <Day20190913 {...props} />}></Route>
        </Router>
    )
}
