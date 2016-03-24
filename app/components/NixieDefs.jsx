import React, { PropTypes } from 'react';

const NixiesDefs = () => (
  <defs>
    <filter id="glowing" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feSpecularLighting in="blur" surfaceScale="3" specularConstant=".5"
                          specularExponent="20" lighting-color="#fac400"
                          result="specOut">
        <fePointLight x="-5000" y="-10000" z="20000"/>
      </feSpecularLighting>
      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
      <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic"
                   k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="litPaint"/>
      </feMerge>
    </filter>

    <pattern id="gridPattern" x="0" y="0" width="7" height="4" patternUnits="userSpaceOnUse">
      <path d="M 7.4,2.1 4.9,2.1 3.7,4.1 1.4,4.1 0.11,2.1 1.4,0.03 3.7,0.03 4.9,2.1" class="gridElement" />
    </pattern>

    <path d="M 23,3.6 C 48,3.6 48,74 23,74 -1.7,74 -1.7,3.6 23,3.6 Z" id="d0"   />
    <path d="M 21,3.6 24,3.6 24,74 21,74 Z" id="d1" />
    <path d="M 3.3,24 C 3.3,-1.4 43,-1.4 43,24 43,24 43,34 28,39 10,44 3.3,74 3.3,74 L 43,74 43,74" id="d2" />
    <path d="M 3.6,3.6 39,3.6 24,34 C 54,44 44,74 24,74 3.6,74 3.6,54 3.6,54 L 3.6,54" id="d3" />
    <path d="M 43,63 3.6,63 31,1.6 31,75" id="d4" />
    <path d="M 40,3.6 7.1,3.6 4.1,37 C 4.1,37 21,33 26,35 46,39 50,71 24,74 1.1,74 4.1,53 4.1,53" id="d5" />
    <path d="M 27,4.6 C -3.7,17 -5.7,72 22,74 45,75 54,38 26,33 14,32 2.8,44 2.8,44" id="d6" />
    <path d="M 3,6.6 43,6.6 18,74 18,74" id="d7" />
    <path d="M 23,3.6 C 43,3.6 43,34 23,34 50,34 50,74 23,74 -3.7,74 -3.7,34 23,34 3.2,34 3.2,3.6 23,3.6 Z" id="d8" />
    <path d="M 41,38 C -0.36,65 -8.7,3.6 24,3.6 49,3.6 48,62 19,74" id="d9" />

    <rect fill="url(#gridPattern)" x="0" y="0" width="47" height="80" id="grid" />
  </defs>

);

ClockDefs.PropTypes = {
    clockRadius: PropTypes.number.isRequired
}

export default ClockDefs;
