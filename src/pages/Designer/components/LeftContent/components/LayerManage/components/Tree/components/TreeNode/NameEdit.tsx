import {
  useCallback,
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

export type NameEditorRefProps = {
  changeEditStatus: (status: boolean) => void;
};

const NameEditor = forwardRef<
  NameEditorRefProps,
  {
    value: ComponentData.TComponentData;
    onChange: (value: SuperPartial<ComponentData.TComponentData>) => void;
    select: string[];
    setSelect: (value: string[]) => void;
  }
>((props, ref) => {
  const { value, onChange, select, setSelect } = props;
  const { name, id } = value;

  const [editable, setEditable] = useState<boolean>(false);

  const editTimestamps = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const changeSelect = useCallback(() => {
    const index = select.indexOf(id);
    let newSelect: string[] = [];
    if (!!~index) {
      newSelect = [];
    } else {
      newSelect = [id];
    }
    setSelect(newSelect);
  }, [id, select, setSelect]);

  const changeName = useCallback(
    (e) => {
      const newName = e.target.value || name;
      setEditable(false);
      onChange({
        name: newName,
      });
    },
    [onChange, id, name],
  );

  const changeEditState = useCallback(
    (e) => {
      setEditable(true);
      return;

      e.stopPropagation();
      // dbClick
      if (Date.now() - editTimestamps.current < 200) {
        setEditable(true);
        editTimestamps.current = 0;
        clearTimeout(timerRef.current as any);
      }
      // click
      else {
        timerRef.current = setTimeout(() => {
          changeSelect();
          editTimestamps.current = 0;
        }, 200);
        editTimestamps.current = Date.now();
      }
    },
    [changeSelect],
  );

  // 名称修改
  const baseNameEdit = useMemo(() => {
    return editable ? (
      <Input defaultValue={name} onBlur={changeName} autoFocus />
    ) : (
      <div
        onDoubleClick={changeEditState}
        className={classnames(
          'c-po',
          styles['design-page-layer-item-name-basic'],
        )}
        title={name}
      >
        {name}
      </div>
    );
  }, [editable, name, changeName, changeEditState]);

  useImperativeHandle(
    ref,
    () => {
      return {
        changeEditStatus: (status) => {
          setEditable(status);
        },
      };
    },
    [],
  );

  return baseNameEdit;
});

export default NameEditor;
