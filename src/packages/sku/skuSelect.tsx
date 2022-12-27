import React, {
    FunctionComponent,
    useEffect,
    useState
  } from 'react'
import { useConfig } from '@/packages/configprovider'
  
import { IComponent } from '@/utils/typings'
import classNames from 'classnames'
  
export interface SkuSelectProps extends IComponent {
  sku: Array<any>
  selectSku: () => void
}
  
export const SkuSelect: FunctionComponent<
  Partial<SkuSelectProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> = (props) => {
  const { locale } = useConfig()
  const {
    sku = [],
    selectSku
  } = {
    ...props,
  }

  const [skuInfo, setSkuInfo] = useState([])

  useEffect(() => {
    if (sku.length > 0) {
      setSkuInfo([].slice.call(sku))
    }
  }, [])

  useEffect(() => {
    if (sku.length > 0) {
      setSkuInfo([].slice.call(sku))
    }
  }, [sku])

  const changeSaleChild = (attrItem: any, index: any, parentItem: any, parentIndex: any) => {
    if (attrItem.checkFlag || attrItem.disable) {
      return;
    }

    selectSku({
      sku: attrItem,
      skuIndex: index,
      parentSku: parentItem,
      parentIndex: parentIndex
    })
  }

  return (
      <div className='nut-sku-select'>
        {
          skuInfo.map((item, index) => {
            return <div className='nut-sku-select-item' key={item.id}>
              <div className='nut-sku-select-item-title'>{item.name}</div>
              <div className='nut-sku-select-item-skus'>
                {
                  item.list.map((itemAttr, itemAttrIndex) => {
                    return <div 
                      className={classNames(['nut-sku-select-item-skus-sku', { active: !itemAttr.disable && itemAttr.active }, { disable: itemAttr.disable }])}
                      key={itemAttr.name}
                      onClick={changeSaleChild.bind(this, itemAttr, itemAttrIndex, item, index)}
                    >
                      {itemAttr.name}
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
  )
}

SkuSelect.displayName = 'NutSkuSelect'
  