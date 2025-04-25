export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      attachments: {
        Row: {
          file_url: string
          id: string
          record_id: string | null
          type: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          file_url: string
          id?: string
          record_id?: string | null
          type?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          file_url?: string
          id?: string
          record_id?: string | null
          type?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attachments_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attachments_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnoses: {
        Row: {
          diagnosis_date: string | null
          diagnosis_description: string | null
          doctor_id: string | null
          icd_code: string
          id: string
          record_id: string | null
        }
        Insert: {
          diagnosis_date?: string | null
          diagnosis_description?: string | null
          doctor_id?: string | null
          icd_code: string
          id?: string
          record_id?: string | null
        }
        Update: {
          diagnosis_date?: string | null
          diagnosis_description?: string | null
          doctor_id?: string | null
          icd_code?: string
          id?: string
          record_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnoses_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          allergies: string | null
          created_at: string | null
          created_by: string | null
          id: string
          medical_history: string | null
          notes: string | null
          prescriptions: string | null
          student_id: string | null
          updated_at: string | null
          visit_date: string
        }
        Insert: {
          allergies?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          medical_history?: string | null
          notes?: string | null
          prescriptions?: string | null
          student_id?: string | null
          updated_at?: string | null
          visit_date?: string
        }
        Update: {
          allergies?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          medical_history?: string | null
          notes?: string | null
          prescriptions?: string | null
          student_id?: string | null
          updated_at?: string | null
          visit_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          additional_instructions: string | null
          doctor_id: string | null
          dosage: string | null
          duration: string | null
          frequency: string | null
          id: string
          medication_name: string
          prescribed_at: string | null
          record_id: string | null
        }
        Insert: {
          additional_instructions?: string | null
          doctor_id?: string | null
          dosage?: string | null
          duration?: string | null
          frequency?: string | null
          id?: string
          medication_name: string
          prescribed_at?: string | null
          record_id?: string | null
        }
        Update: {
          additional_instructions?: string | null
          doctor_id?: string | null
          dosage?: string | null
          duration?: string | null
          frequency?: string | null
          id?: string
          medication_name?: string
          prescribed_at?: string | null
          record_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string
          hospital_number: string
          id: string
          phone_number: string | null
          role: string
          staff_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name: string
          hospital_number: string
          id?: string
          phone_number?: string | null
          role: string
          staff_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string
          hospital_number?: string
          id?: string
          phone_number?: string | null
          role?: string
          staff_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string
          email: string | null
          faculty: string
          full_name: string
          guardian_name: string | null
          guardian_phone: string | null
          guardian_relationship: string | null
          hospital_number: string
          id: string
          matric_number: string
          phone_number: string | null
          photograph_url: string | null
          sex: string
          signature_url: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department: string
          email?: string | null
          faculty: string
          full_name: string
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relationship?: string | null
          hospital_number: string
          id?: string
          matric_number: string
          phone_number?: string | null
          photograph_url?: string | null
          sex: string
          signature_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string
          email?: string | null
          faculty?: string
          full_name?: string
          guardian_name?: string | null
          guardian_phone?: string | null
          guardian_relationship?: string | null
          hospital_number?: string
          id?: string
          matric_number?: string
          phone_number?: string | null
          photograph_url?: string | null
          sex?: string
          signature_url?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vital_signs: {
        Row: {
          blood_pressure: string | null
          heart_rate: number | null
          id: string
          nurse_id: string | null
          pulse_rate: number | null
          record_id: string | null
          recorded_at: string | null
          respiratory_rate: number | null
          temperature: number | null
        }
        Insert: {
          blood_pressure?: string | null
          heart_rate?: number | null
          id?: string
          nurse_id?: string | null
          pulse_rate?: number | null
          record_id?: string | null
          recorded_at?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
        }
        Update: {
          blood_pressure?: string | null
          heart_rate?: number | null
          id?: string
          nurse_id?: string | null
          pulse_rate?: number | null
          record_id?: string | null
          recorded_at?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vital_signs_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vital_signs_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
