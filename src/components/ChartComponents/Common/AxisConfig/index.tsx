import { ReactNode, useCallback, useMemo } from 'react';
import { pick } from 'lodash';
import ConfigList from '../Structure/ConfigList';
import YAxisPosition from './YAxisPosition';
import XAxisPosition from './XAxisPosition';
import { SingleCollapse as Collapse } from '../Collapse';
import { FontConfigList } from '../FontConfig';
import AngleSelect from '../AngleSelect';
import FullForm from '../Structure/FullForm';
import Input from '../Input';
import InputNumber from '../InputNumber';

const { Item } = ConfigList;

export type AxisConfigProps = {
  ignore?: string[];
  type: 'xAxis' | 'yAxis';
  value: (
    | Partial<ComponentData.ComponentXAxis>
    | Partial<ComponentData.ComponentYAxis>
  ) & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const AxisConfig = (props: AxisConfigProps) => {
  const { type, ignore = [], value, onChange, children } = props;
  const { position, axisLabel, name, nameTextStyle } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const onAxisLabelChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        axisLabel: {
          [key]: value,
        },
      });
    },
    [onChange],
  );

  const needPosition = useMemo(() => {
    return !ignore.includes('position');
  }, [ignore]);

  const needAxisLabel = useMemo(() => {
    return !ignore.includes('axisLabel');
  }, [ignore]);

  const needName = useMemo(() => {
    return ignore.includes('name');
  }, [ignore]);

  const positionConfig = useMemo(() => {
    if (!needPosition) return null;
    return (
      <Item label="位置">
        {type === 'xAxis' ? (
          <XAxisPosition
            value={position!}
            onChange={onKeyChange.bind(null, 'position')}
          />
        ) : (
          <YAxisPosition
            value={position!}
            onChange={onKeyChange.bind(null, 'position')}
          />
        )}
      </Item>
    );
  }, [needPosition, type, position, onKeyChange]);

  const axisLabelConfig = useMemo(() => {
    if (!needAxisLabel) return null;
    return (
      <Collapse
        parent={{}}
        child={{
          header: '刻度标签',
          key: 'axisLabel',
          visibleRender: true,
          value: axisLabel!.show,
          onChange: onAxisLabelChange.bind(null, 'show'),
        }}
      >
        <Item label="旋转（deg）">
          <FullForm>
            <AngleSelect
              value={axisLabel!.rotate || 0}
              onChange={onAxisLabelChange.bind(null, 'rotate')}
            />
          </FullForm>
        </Item>
        <Item label="间距">
          <FullForm>
            <InputNumber
              value={axisLabel!.margin || 0}
              onChange={onAxisLabelChange.bind(null, 'margin')}
              className="w-100"
            />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文本',
            key: 'textStyle',
          }}
          level={3}
        >
          <FontConfigList
            value={pick(axisLabel!, [
              'color',
              'fontSize',
              'fontWeight',
              'fontFamily',
            ])}
            onChange={onKeyChange.bind(null, 'axisLabel')}
          />
        </Collapse>
      </Collapse>
    );
  }, [needAxisLabel, axisLabel, onAxisLabelChange, onKeyChange]);

  const nameConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '名称',
          key: 'name',
        }}
      >
        <Item label="内容">
          <FullForm>
            <Input value={name} onChange={onKeyChange.bind(null, 'name')} />
          </FullForm>
        </Item>
        <Collapse
          child={{
            header: '文字',
            key: 'font',
          }}
          level={3}
        >
          <FontConfigList
            value={nameTextStyle}
            onChange={onKeyChange.bind(null, 'nameTextStyle')}
          />
        </Collapse>
      </Collapse>
    );
  }, [needName, name, nameTextStyle, onKeyChange]);

  return (
    <ConfigList>
      {positionConfig}
      {axisLabelConfig}
      {nameConfig}
      {children}
    </ConfigList>
  );
};

export default AxisConfig;
