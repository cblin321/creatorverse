import { createClient } from "@supabase/supabase-js";

const URL = 'https://wlcmuqbhckijufroqkzn.supabase.co'

const API_KEY = 'sb_publishable_Ob7mUyE2Ef0-pOI2ieLKpQ_a9AjHPYI'

const supabase = createClient(URL, API_KEY)

const { data, error } = await supabase.from('creators').select('*')
console.log(error)

console.log(data)


export { supabase };
