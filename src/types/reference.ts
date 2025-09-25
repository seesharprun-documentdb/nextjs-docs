export type NoSQLQueryReference = {
  type: 'operator' | 'command';
  name: string;
  description: string;
  summary?: string;
  syntax: string;
  parameters: Array<{
    name: string;
    type: 'object' | 'string' | 'number' | 'pattern';
    required: boolean;
    description?: string;
  }>;
  examples: {
    sample?: {
      set: 'products' | 'stores' | 'employees';
      filter: string;
    };
    items: Array<{
      title: string;
      explanation?: string;
      description: string;
      query: string;
      output?: {
        devlang?: 'bson' | 'json' | 'plaintext';
        value: string;
      };
    }>;
  };
  related?: Array<{
    reference: string;
  }>;
};
