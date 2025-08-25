'use client'
import {PortableText, PortableTextComponents} from '@portabletext/react'

const components: PortableTextComponents = {
  // можно кастомизировать теги
}

export default function Portable({value}: {value: any}) {
  return <PortableText value={value} components={components} />
}
