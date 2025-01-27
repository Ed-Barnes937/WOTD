import supabase from "../services/supabase/client";
import { buildQueryOpts } from "@supabase-cache-helpers/postgrest-react-query";

export const buildWOTDQuery = () => supabase.from("todaywords").select("*");

export const fetchWOTDFromDbQueryOptions = buildQueryOpts(buildWOTDQuery());
