import React from 'react'

import '../scss/components/Cassette.scss'
import '../scss/components/Cassette-2.scss'
import '../scss/components/Cassette-3.scss'
import '../scss/components/Cassette-4.scss'
import '../scss/components/Cassette-5.scss'

class Cassette extends React.Component {

  render(){
    const playing = this.props.playing
    const rndm = (this.props.id%5)+1
    return (
      <div className={`cassette-wrap-${rndm}`}>
        <span className="screw"></span>
        <span className="screw"></span>
        <span className="screw"></span>
        <span className="screw"></span>
        <div className="cassette-locker L"></div>
        <div className="cassette-locker R"></div>
        <div className="filament-stiffner L"></div>
        <div className="filament-stiffner R"></div>
        <div className="filament-process-wrap">
          <span className="square-filament-stiffner L"></span>
          <span className="square-filament-stiffner R"></span>
          <span className="circle-filament-stiffner L"></span>
          <span className="circle-filament-stiffner R"></span>
          <span className="screw"></span>
          <div className="filament-reader-area"></div>
        </div>
        <div className="filaments-container">
          <div className="circular-container L"></div>
          <div className="circular-container R"></div>

          <div className="cassette-cover-sticker">
            <input
              className={`cassette-name ${this.props.disableSave ? 'disabled' : '' }`}
              value={this.props.label}
              onChange={this.props.onChange}
            />
            <div className="tape-level-wrap">
              <div className={`filament L ${playing ? 'playing':''}`}>
                <div className={`hub ${playing ? 'playing':''}`}>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                </div>
              </div>
              <div className={`filament R ${playing ? 'playing':''}`}>
                <div className={`hub ${playing ? 'playing':''}`}>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                  <span className="hub-lock"></span>
                </div>
              </div>

            </div>
          </div>

          <div className="filament-thin-wrap"></div>
        </div>
      </div>
    )
  }
}

export default Cassette
