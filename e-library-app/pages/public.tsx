import { createClient } from '@/utils/supabase/static-props'

// Define the interface for a color record
interface ColorRecord {
  id: number
  name: string
  hex_value: string
  // Add any other fields that exist in your colors table
}

interface PublicPageProps {
  data?: ColorRecord[]
}

export default function PublicPage({ data }: PublicPageProps) {
  return <pre>{data && JSON.stringify(data, null, 2)}</pre>
}

export async function getStaticProps() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('colors')
    .select<'colors', ColorRecord>()
  
  if (error || !data) {
    return { props: {} }
  }
  
  return { props: { data } }
}