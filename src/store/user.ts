/** @format */

import {useState} from 'react'
import {createContainer} from 'unstated-next'
import {IAddress, IAddressSelect} from '@/type'
import * as API from '../api'

export const initAddress = {
  id: 0,
  name: '',
  mobile: 0,
  college_id: 0,
  college_name: '',
  address: '',
}
export const useAddress = () => {
  const [list, setList] = useState<IAddress[]>([])
  const [active, setActive] = useState<IAddress>(initAddress)
  const [select, setSelect] = useState<IAddressSelect>({})

  /**
   * 获取地址列表
   */
  const pull = async () => {
    if (!list.length) {
      const res = await API.getAddress()
      setList(res.data)
    }
  }

  /**
   * 更新地址列表
   * @param body
   */
  const push = async (body: IAddress): Promise<number> => {
    if (body.id) {
      await API.updateAddress({id: body.id, data: body})
      setList(oldList => {
        oldList.forEach((item, index) => {
          if (item.id === body.id) {
            oldList[index] = {...item, ...body}
          }
        })
        return oldList
      })
      return body.id
    } else {
      const res = await API.createAddress({data: body})
      setList(newList => {
        newList.push({...body, id: res.data.id})
        return newList
      })
      return res.data.id
    }
  }

  /**
   * 更新当前的地址
   * @param id 地址id
   */
  const updateActive = (id?: number) => {
    if (!id) {
      setActive({...initAddress})
    } else {
      const res = list.find(item => item.id === id)
      res && setActive(res)
    }
  }

  /**
   * 删除地址
   * @param id 地址id
   */
  const remove = async (id: number) => {
    await API.deleteAddress({id})

    setList(oldList => {
      oldList.forEach((item, index) => {
        if (item.id === id) {
          oldList.splice(index, 1)
        }
      })
      return oldList
    })
    setActive(old => {
      if (id === old.id) {
        return {...initAddress}
      } else {
        return old
      }
    })
    setSelect(old => {
      if (id === old.address_id) {
        return {}
      } else {
        return old
      }
    })
  }

  /**
   * 更新选择
   * @param collegeId 当前学校学校id
   * @param addressId 地址id
   */
  const updateSelect = (collegeId: number, addressId?: number) => {
    // 优先取默认，看默认学校与当前是否一致，如果不是，在取第一个当前学校地址
    if (!addressId) {
      const defaultAddress = list.find(item => !!item.default)
      if (defaultAddress && collegeId == defaultAddress.college_id) {
        _updateSelect(defaultAddress)
      } else {
        const current = list.find(item => item.college_id == collegeId)
        if (current) {
          _updateSelect(current)
        } else {
          _clearSelect()
        }
      }
    } else {
      const current = list.find(item => item.college_id == collegeId && addressId == item.id)
      if (current) {
        _updateSelect(current)
      } else {
        _clearSelect()
      }
    }
  }

  const _updateSelect = address => {
    setList(oldList => {
      oldList.forEach(item => {
        if (item.id == address.id) {
          item.default = 1
        } else {
          item.default = 0
        }
      })
      return oldList
    })
    setSelect({
      address_id: address.id,
      address_name: address.name,
      address_mobile: address.mobile,
      address_detail: address.college_name + address.address,
    })
  }

  const _clearSelect = () => {
    setSelect({})
  }

  return {
    list,
    active,
    select,
    pull,
    push,
    remove,
    updateActive,
    updateSelect,
  }
}

export default createContainer(useAddress)
