import React from 'react';
import { useState } from 'react';

import { getDarkerColor, getLayerRadius, polarToCartesian } from '../../../utils';

import styles from './wheelOfFeelings.module.scss';

interface Emotion {
  name: string;
  color: string;
  layer: number;
  group: number;
}

const emotions: Emotion[] = [
  { layer: 1, name: 'PYKTIS', color: '#C0E1D7', group: 1 },
  { layer: 1, name: 'PASIBJAURĖJIMAS', color: '#9185BE', group: 2 },
  { layer: 1, name: 'NEVILTIS', color: '#8A858A', group: 3 },
  { layer: 1, name: 'LAIMĖ', color: '#009640', group: 4 },
  { layer: 1, name: 'NUOSTABA', color: '#8BCBB7', group: 5 },
  { layer: 1, name: 'BAIMĖ', color: '#EBF5F0', group: 6 },

  { layer: 2, name: 'ĮSKAUDINTAS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'JAUČIANTIS GRĖSMĘ', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'KUPINAS NEAPYKANTOS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'ĮSIUTĘS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'AGRESYVUS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'SUŽLUGDYTAS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'NUTOLĘS', color: '#C0E1D7', group: 1 },
  { layer: 2, name: 'KRITIŠKAS', color: '#C0E1D7', group: 1 },

  { layer: 2, name: 'NEPRITARIANTIS', color: '#9185BE', group: 2 },
  { layer: 2, name: 'NUSIVYLĘS', color: '#9185BE', group: 2 },
  { layer: 2, name: 'PASIBAISĖJĘS', color: '#9185BE', group: 2 },
  { layer: 2, name: 'VENGIANTIS', color: '#9185BE', group: 2 },

  { layer: 2, name: 'KALTAS', color: '#8A858A', group: 3 },
  { layer: 2, name: 'APLEISTAS', color: '#8A858A', group: 3 },
  { layer: 2, name: 'BEVILTIŠKAS', color: '#8A858A', group: 3 },
  { layer: 2, name: 'PRISLĖGTAS', color: '#8A858A', group: 3 },
  { layer: 2, name: 'VIENIŠAS', color: '#8A858A', group: 3 },
  { layer: 2, name: 'NUOBODŽIAUJANTIS', color: '#8A858A', group: 3 },

  { layer: 2, name: 'OPTIMISTIŠKAS', color: '#009640', group: 4 },
  { layer: 2, name: 'JAUKUS', color: '#009640', group: 4 },
  { layer: 2, name: 'RAMUS', color: '#009640', group: 4 },
  { layer: 2, name: 'GALINGAS', color: '#009640', group: 4 },
  { layer: 2, name: 'PRIIMTAS', color: '#009640', group: 4 },
  { layer: 2, name: 'IŠDIDUS', color: '#009640', group: 4 },
  { layer: 2, name: 'SUSIDOMĖJIMAS', color: '#009640', group: 4 },
  { layer: 2, name: 'DŽIAUGSMAS', color: '#009640', group: 4 },

  { layer: 2, name: 'SUSIJAUDINĘS', color: '#8BCBB7', group: 5 },
  { layer: 2, name: 'NUSTEBĘS', color: '#8BCBB7', group: 5 },
  { layer: 2, name: 'SUMIŠĘS', color: '#8BCBB7', group: 5 },
  { layer: 2, name: 'SUJAUDINTAS', color: '#8BCBB7', group: 5 },

  { layer: 2, name: 'IŠGĄSDINTAS', color: '#EBF5F0', group: 5 },
  { layer: 2, name: 'NERIMAUJANTIS', color: '#EBF5F0', group: 5 },
  { layer: 2, name: 'NESAUGUS', color: '#EBF5F0', group: 5 },
  { layer: 2, name: 'NUOLANKUS', color: '#EBF5F0', group: 5 },
  { layer: 2, name: 'ATSTUMTAS', color: '#EBF5F0', group: 5 },
  { layer: 2, name: 'PAŽEMINTAS', color: '#EBF5F0', group: 5 },

  { layer: 3, name: 'SUGNIUŽDYTAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'PAVYDINTIS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'PAGIEŽINGAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'IŠNIEKINTAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'ĮNIRŠĘS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'ĮTŪŽĘS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'IŠPROVOKUOTAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'ĮSIUTINTAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'SUERZINTAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'ATSIRIBOJĘS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'ĮTARUS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'SKEPTIŠKAS', color: '#C0E1D7', group: 1 },
  { layer: 3, name: 'SARKASTIŠKAS', color: '#C0E1D7', group: 1 },

  { layer: 3, name: 'SMERKIANTIS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'NEAPKENČIANTIS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'PRIEŠIŠKAS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'PASIPIKTINĘS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'PASIBJAURĖJĘS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'PASIŠLYKŠTĖJĘS', color: '#9185BE', group: 2 },
  { layer: 3, name: 'ANTIPATIJA', color: '#9185BE', group: 2 },
  { layer: 3, name: 'DVEJOJANTIS', color: '#9185BE', group: 2 },

  { layer: 3, name: 'ATGAILAUJANTS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'SUSIGĖDĘS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'IGNORUOJAMAS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'NUSKRIAUSTAS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'BEJĖGIS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'PAŽEIDŽIAMAS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'MENKAVERTIS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'TUŠTUMA', color: '#8A858A', group: 3 },
  { layer: 3, name: 'ATSKIRTAS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'APATIŠKAS', color: '#8A858A', group: 3 },
  { layer: 3, name: 'ABEJINGAS', color: '#8A858A', group: 3 },

  { layer: 3, name: 'ĮKVĖPTAS', color: '#009640', group: 4 },
  { layer: 3, name: 'ATVIRAS', color: '#009640', group: 4 },
  { layer: 3, name: 'JAUTRUS', color: '#009640', group: 4 },
  { layer: 3, name: 'ŽAISMINGAS', color: '#009640', group: 4 },
  { layer: 3, name: 'KUPINAS VILČIŲ', color: '#009640', group: 4 },
  { layer: 3, name: 'MYLINTIS', color: '#009640', group: 4 },
  { layer: 3, name: 'PROVOKUOJANTIS', color: '#009640', group: 4 },
  { layer: 3, name: 'DRĄSUS', color: '#009640', group: 4 },
  { layer: 3, name: 'PILNATVĖ', color: '#009640', group: 4 },
  { layer: 3, name: 'GERBIAMAS', color: '#009640', group: 4 },
  { layer: 3, name: 'SVARBUS', color: '#009640', group: 4 },
  { layer: 3, name: 'PASITIKINTIS', color: '#009640', group: 4 },
  { layer: 3, name: 'ĮSISMAGINĘS', color: '#009640', group: 4 },
  { layer: 3, name: 'SMALSUS', color: '#009640', group: 4 },
  { layer: 3, name: 'APIMTAS EKSTAZĖS', color: '#009640', group: 4 },
  { layer: 3, name: 'ATSIPALAIDAVĘS', color: '#009640', group: 4 },

  { layer: 3, name: 'ENERGINGAS', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'NEKANTRAUJANTIS', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'PAGARBI BAIMĖ', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'APSTULBĘS', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'PRIBLOKŠTAS', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'NUSIMINĘS', color: '#8BCBB7', group: 5 },
  { layer: 3, name: 'SUKRĖSTAS', color: '#8BCBB7', group: 5 },

  { layer: 3, name: 'SIAUBAS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'PERSIGANDĘS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'SUSIRŪPINĘS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'NEPRITAPĘS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'BEVERTIS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'NESVARBUS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'IŠJUOKTAS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'NEGERBIAMAS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'SUSVETIMĖJĘS', color: '#EBF5F0', group: 6 },
  { layer: 3, name: 'NEPILNAVERTIS', color: '#EBF5F0', group: 6 },
];
type Props = {
  setMostImportantEmotion: React.Dispatch<React.SetStateAction<string>>;
};
const EmotionWheel: React.FC<Props> = ({ setMostImportantEmotion }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const handleEmotionClick = (emotionName: string) => {
    setMostImportantEmotion(emotionName);
  };

  const handleMouseEnter = (emotionName: string) => {
    setHoveredEmotion(emotionName);
  };

  const handleMouseLeave = () => {
    setHoveredEmotion(null);
  };

  const generatePathForLayeredEmotion = (
    index: number,
    totalEmotions: number,
    layerIndex: number,
    layersTotal: number
  ): string => {
    const centerX = 50;
    const centerY = 50;
    const maxRadius = 50;
    const innerRadius =
      layerIndex === 0 ? 0 : getLayerRadius(layerIndex - 1, layersTotal, maxRadius);
    const outerRadius = getLayerRadius(layerIndex, layersTotal, maxRadius);

    const anglePerEmotion = 360 / totalEmotions;

    const startAngle = index * anglePerEmotion;
    const endAngle = startAngle + anglePerEmotion;

    const innerStart = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M${innerStart.x},${innerStart.y}`,
      `L${outerStart.x},${outerStart.y}`,
      `A${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEnd.x},${outerEnd.y}`,
      `L${innerEnd.x},${innerEnd.y}`,
      innerRadius > 0
        ? `A${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${innerStart.x},${innerStart.y}`
        : '',
      'Z',
    ].join(' ');
  };

  const getIndexWithinLayer = (emotion: Emotion, sortedEmotions: Emotion[]) => {
    let index = sortedEmotions.findIndex(
      (sortedEmotion) =>
        sortedEmotion.name === emotion.name && sortedEmotion.layer === emotion.layer
    );
    if (emotion.layer === 2) {
      index = Math.max(0, index - 6);
    }
    if (emotion.layer === 3) {
      index = Math.max(0, index - 42);
    }
    return index;
  };

  const getTextAngle = (startAngle: number, endAngle: number) => {
    const textAngle = startAngle + (endAngle - startAngle) / 2 - 90;

    return textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle;
  };

  return (
    <>
      <svg className={styles.wheel} viewBox='0 0 100 100' width='100%'>
        {emotions.map((emotion) => {
          const layerIndex = emotion.layer - 1;
          const totalEmotionsInLayer = emotions.filter((e) => e.layer === emotion.layer).length;
          const indexWithinLayer = getIndexWithinLayer(emotion, emotions);
          const anglePerEmotion = 360 / totalEmotionsInLayer;
          const startAngle = indexWithinLayer * anglePerEmotion;
          const endAngle = startAngle + anglePerEmotion;
          const textAngle = getTextAngle(startAngle, endAngle);

          const getMiddleRadius = () => {
            let middleRadius;
            switch (emotion.layer) {
              case 2:
                middleRadius = (getLayerRadius(0, 3, 40) + getLayerRadius(1, 3, 40)) / 1.75;
                break;
              case 3:
                middleRadius =
                  (getLayerRadius(0, 3, 40) +
                    getLayerRadius(1, 3, 40) +
                    +getLayerRadius(2, 3, 40)) /
                  2.05;
                break;
              default:
                middleRadius = getLayerRadius(0, 3, 40) / 2.2;
                break;
            }
            return middleRadius;
          };

          const middleRadius = getMiddleRadius();

          const textPosition = polarToCartesian(
            50,
            50,
            middleRadius + 3,
            (startAngle + endAngle) / 2
          );

          return (
            <React.Fragment key={emotion.name}>
              <path
                className={styles.emotion}
                d={generatePathForLayeredEmotion(
                  indexWithinLayer,
                  totalEmotionsInLayer,
                  layerIndex,
                  3
                )}
                fill={
                  hoveredEmotion === emotion.name ? getDarkerColor(emotion.color) : emotion.color
                }
                onClick={() => handleEmotionClick(emotion.name)}
                onMouseEnter={() => handleMouseEnter(emotion.name)}
                onMouseLeave={handleMouseLeave}
                stroke='#000'
                strokeWidth='0.1'
              />
              {emotion.layer === 1 || emotion.layer === 2 || emotion.layer === 3 ? (
                <text
                  fontSize='1.6'
                  textAnchor='middle'
                  transform={`translate(${textPosition.x},${textPosition.y}) rotate(${textAngle})`}
                  fill='#000'
                  pointerEvents='none'
                >
                  {emotion.name}
                </text>
              ) : null}
            </React.Fragment>
          );
        })}
      </svg>
    </>
  );
};

export default EmotionWheel;
