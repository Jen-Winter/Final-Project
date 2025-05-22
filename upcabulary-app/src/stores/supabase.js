import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ykjmcfbnxcimkrabornr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlram1jZmJueGNpbWtyYWJvcm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDg5MzcsImV4cCI6MjA2MzQyNDkzN30.Fwvs4_6Go2m2huWx0pbhc0bIXKX-8-d9QzQPIK3od50'

export const supabase = createClient(supabaseUrl, supabaseKey)