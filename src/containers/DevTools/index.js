import React from 'react';
import { createDevTools } from 'redux-devtools';
import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="H"
               defaultIsVisible={false}
               changePositionKey="W">
    <LogMonitor />
  </DockMonitor>
);

export default function getDevTools(){
	 switch(process.env.NODE_ENV){
        case 'development':
            return DevTools;

        case 'production':
            return function(props){
				return <div/>;
			};

        default:
             return function(props){
				return <div/>;
			};
    }
}


