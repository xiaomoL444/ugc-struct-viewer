import StringField from '../JsonField/StringField.vue'
import StringListField from '../JsonField/StringListField.vue'
import Int32Field from '../JsonField/Int32Field.vue'
import Int32ListField from '../JsonField/Int32ListField.vue'
import FloatField from '../JsonField/FloatField.vue'
import FloatListField from '../JsonField/FloatListField.vue'
import BoolField from '../JsonField/BoolField.vue'
import BoolListField from '../JsonField/BoolListField.vue'
import Vector3Field from '../JsonField/Vector3Field.vue'
import Vector3ListField from '../JsonField/Vector3ListField.vue'
import EntityField from '../JsonField/EntityField.vue'
import EntityListField from '../JsonField/EntityListField.vue'
import StructField from '../JsonField/StructField.vue'
import DictField from '../JsonField/DictField.vue'
import StructListField from '../JsonField/StructListField.vue'

export function getTypeNameMap() {
    return {
        String: '字符串',
        StringList: '字符串列表',
        Int32: '整数',
        Int32List: '整数列表',
        Float: '浮点数',
        FloatList: '浮点数列表',
        Bool: '布尔值',
        BoolList: '布尔值列表',
        Vector3: '三维向量',
        Vector3List: '三维向量列表',
        Entity: '实体',
        EntityList: '实体列表',
        Guid: 'Guid',
        GuidList: 'Guid列表',
        ConfigReference: '配置ID',
        ConfigReferenceList: '配置ID列表',
        EntityReference: '元件ID',
        EntityReferenceList: '元件ID列表',
        Army: '阵营',
        ArmyList: '阵营列表',
        Struct: '结构体',
        StructList: '结构体列表',
        Dict: '字典'
    }
}

export function getTypeComponentMap() {
    return {
        String: StringField,
        StringList: StringListField,
        Int32: Int32Field,
        Int32List: Int32ListField,
        Float: FloatField,
        FloatList: FloatListField,
        Bool: BoolField,
        BoolList: BoolListField,
        Vector3: Vector3Field,
        Vector3List: Vector3ListField,
        Entity: EntityField,
        EntityList: EntityListField,
        Guid: Int32Field,
        GuidList: Int32ListField,
        ConfigReference: Int32Field,
        ConfigReferenceList: Int32ListField,
        EntityReference: Int32Field,
        EntityReferenceList: Int32ListField,
        Army: Int32Field,
        ArmyList: Int32ListField,
        Struct: StructField,
        StructList: StructListField,
        Dict: DictField
    }
}