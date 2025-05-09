export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          _links: string | null
          account_id: number | null
          closed_at: string | null
          closest_task_at: string | null
          created_at: string | null
          created_by: number | null
          custom_fields_values: string | null
          group_id: number | null
          id: number
          is_deleted: boolean | null
          labor_cost: number | null
          loss_reason_id: number | null
          name: string | null
          pipeline_id: number | null
          price: number | null
          responsible_user_id: number | null
          score: number | null
          status_id: number | null
          updated_at: string | null
          updated_by: number | null
        }
        Insert: {
          _links?: string | null
          account_id?: number | null
          closed_at?: string | null
          closest_task_at?: string | null
          created_at?: string | null
          created_by?: number | null
          custom_fields_values?: string | null
          group_id?: number | null
          id: number
          is_deleted?: boolean | null
          labor_cost?: number | null
          loss_reason_id?: number | null
          name?: string | null
          pipeline_id?: number | null
          price?: number | null
          responsible_user_id?: number | null
          score?: number | null
          status_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Update: {
          _links?: string | null
          account_id?: number | null
          closed_at?: string | null
          closest_task_at?: string | null
          created_at?: string | null
          created_by?: number | null
          custom_fields_values?: string | null
          group_id?: number | null
          id?: number
          is_deleted?: boolean | null
          labor_cost?: number | null
          loss_reason_id?: number | null
          name?: string | null
          pipeline_id?: number | null
          price?: number | null
          responsible_user_id?: number | null
          score?: number | null
          status_id?: number | null
          updated_at?: string | null
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_responsible_user_id_fkey"
            columns: ["responsible_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_statuses: {
        Row: {
          pipeline_id: number
          status_id: number
        }
        Insert: {
          pipeline_id: number
          status_id: number
        }
        Update: {
          pipeline_id?: number
          status_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_statuses_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_statuses_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      pipelines: {
        Row: {
          account_id: number | null
          id: number
          is_archive: boolean | null
          is_main: boolean | null
          is_unsorted_on: boolean | null
          name: string | null
          sort: number | null
          url: string | null
        }
        Insert: {
          account_id?: number | null
          id: number
          is_archive?: boolean | null
          is_main?: boolean | null
          is_unsorted_on?: boolean | null
          name?: string | null
          sort?: number | null
          url?: string | null
        }
        Update: {
          account_id?: number | null
          id?: number
          is_archive?: boolean | null
          is_main?: boolean | null
          is_unsorted_on?: boolean | null
          name?: string | null
          sort?: number | null
          url?: string | null
        }
        Relationships: []
      }
      statuses: {
        Row: {
          account_id: number | null
          color: string | null
          id: number
          is_editable: boolean | null
          name: string | null
          pipeline_id: number | null
          sort: number | null
          type: number | null
          url: string | null
        }
        Insert: {
          account_id?: number | null
          color?: string | null
          id: number
          is_editable?: boolean | null
          name?: string | null
          pipeline_id?: number | null
          sort?: number | null
          type?: number | null
          url?: string | null
        }
        Update: {
          account_id?: number | null
          color?: string | null
          id?: number
          is_editable?: boolean | null
          name?: string | null
          pipeline_id?: number | null
          sort?: number | null
          type?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "statuses_pipeline_id_fkey"
            columns: ["pipeline_id"]
            isOneToOne: false
            referencedRelation: "pipelines"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          id: number
          lang: string | null
          name: string
          rights: Json | null
        }
        Insert: {
          email: string
          id: number
          lang?: string | null
          name: string
          rights?: Json | null
        }
        Update: {
          email?: string
          id?: number
          lang?: string | null
          name?: string
          rights?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
