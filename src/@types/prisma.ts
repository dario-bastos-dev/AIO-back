enum PrismaErrorCode {
	// Erros de Autenticação
	/** Falha na autenticação com o banco de dados */
	AUTH_FAILED = 'P1000',
	/** O servidor do banco de dados foi encerrado */
	SERVER_CLOSED = 'P1001',
	/** Falha na conexão com o banco de dados */
	CONNECTION_FAILED = 'P1002',

	// Erros de Timeout
	/** Timeout na operação do banco de dados */
	TIMED_OUT = 'P1008',
	/** Timeout na conexão com o banco de dados */
	CONNECTION_TIMED_OUT = 'P1009',

	// Erros de Restrição
	/** Violação de restrição única */
	UNIQUE_CONSTRAINT = 'P2002',
	/** Violação de restrição de chave estrangeira */
	FOREIGN_KEY_CONSTRAINT = 'P2003',
	/** Violação de restrição de verificação */
	CONSTRAINT_VIOLATION = 'P2004',

	// Erros de Registro Não Encontrado
	/** Registro não encontrado */
	RECORD_NOT_FOUND = 'P2001',
	/** Registro necessário não encontrado */
	REQUIRED_RECORD_NOT_FOUND = 'P2025',

	// Erros de Tipo de Dados
	/** Tipo de dados inválido */
	INVALID_DATA_TYPE = 'P2005',
	/** Valor nulo em campo não-nulo */
	NULL_CONSTRAINT = 'P2011',

	// Erros de Operação
	/** Operação falhou */
	OPERATION_FAILED = 'P2010',
	/** Várias operações em um único método não são suportadas */
	UNSUPPORTED_MULTIPLE_OPERATIONS = 'P2012',
	/** Transação falhou */
	TRANSACTION_FAILED = 'P2034',

	// Erros de Configuração
	/** Provedor de banco de dados inválido */
	INVALID_DATABASE_PROVIDER = 'P1013',
	/** Esquema inválido */
	INVALID_SCHEMA = 'P1014',

	// Erros de Conexão
	/** Conexão fechada */
	CONNECTION_CLOSED = 'P1003',
	/** Conexão perdida */
	CONNECTION_LOST = 'P1010',

	// Erros de Modelo
	/** Modelo não encontrado */
	MODEL_NOT_FOUND = 'P2021',
	/** Campo não encontrado no modelo */
	FIELD_NOT_FOUND = 'P2022',

	// Erros de Consulta
	/** Argumento inválido */
	INVALID_ARGUMENT = 'P2006',
	/** Consulta inválida */
	INVALID_QUERY = 'P2009',
	/** Chave de grupo inválida */
	INVALID_GROUP_BY = 'P2013',

	// Erros de Migração
	/** Migração falhou */
	MIGRATION_FAILED = 'P3000',
	/** Migração não encontrada */
	MIGRATION_NOT_FOUND = 'P3001',
	/** Migração já aplicada */
	MIGRATION_ALREADY_APPLIED = 'P3002',

	// Erros Internos
	/** Erro interno do Prisma */
	INTERNAL_ERROR = 'P1015',

	// Outros Erros
	/** Erro desconhecido */
	UNKNOWN = 'P1016',
}

export default PrismaErrorCode;
