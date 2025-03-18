<template>
    <div class="app">
        <div class="app-top-box">
            <div class="app-container">
                <div class="mt-4">
                    <el-input
                    style="border-radius: 0;width: 600px;"   
                    v-model="searchValue"
                    placeholder="请输入内容"
                    class="input-with-select"
                    >
                    <template #prepend>
                        <el-select v-model="searchType" placeholder="" style="width: 110px ;border-radius: 0;">
                        <el-option label="ISSN" value="issn" />
                        <el-option label="期刊名称" value="name" />
                        <el-option label="简称" value="abbr" />
                        <el-option label="科学分类" value="category" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" class="cxbutton" @click="searchTableData" />
                    </template>
                    </el-input>
                </div>
                <div class="fl4">
                    <div class="fl4-1">
                        <span>影响因子</span>
                        <div class="fl4-1-1">
                            <el-input v-model="impactFactor.min" style="width: 40px" placeholder="" />
                            <span>-</span>
                            <el-input v-model="impactFactor.max" style="width: 40px" placeholder="" />
                        </div>
                    </div>
                    <div class="fl4-2">
                        <span>JCR分区</span>
                        <el-select 
                            class="el-select"
                            v-model="jcrPartition"
                            clearable
                            placeholder="不限"
                            style="width: 85px"
                        >
                            <el-option
                            v-for="item in jcrOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </div>    
                    <div class="fl4-3">
                        <span>分区</span>
                        <el-select 
                            class="el-select"
                            v-model="cnPartition"
                            clearable
                            placeholder="不限"
                            style="width: 85px"
                        >
                            <el-option
                            v-for="item in cnOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="fl4-4">
                        <span>综合比例</span>
                        <el-select 
                            class="el-select"
                            v-model="ratio"
                            clearable
                            placeholder="不限"
                            style="width: 85px"
                        >
                            <el-option
                            v-for="item in ratioOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </div>    
                </div> 
            </div>
        </div>

        <div class="bottom-element">
            <el-table :data="filteredTableData" height="319" style="width: 100%">
                <el-table-column prop="name" label="期刊名称" width="180" />
                <el-table-column prop="date" label="数据库" width="120" />
                <el-table-column prop="yxyz" label="影响因子" width="120"/>
                <el-table-column prop="ywbt" label="引文标题" width="120" />
                <el-table-column prop="jcr" label="JCR分区" width="120" />
                <el-table-column prop="gcfq" label="国内分区" width="120" />
                <el-table-column prop="nfwl" label="年发文量" width="120" />
                <el-table-column prop="zszb" label="综述占比" width="120" />
                <el-table-column prop="opensource" label="开源比" width="120" />
                <el-table-column prop="sfgc" label="是否国产" width="80" />
            </el-table>

            <div class="pagination-container">
                <el-pagination 
                  background 
                  layout="prev, pager, next" 
                  :total="total"
                  :page-size="pageSize"
                  @current-change="handlePageChange"
                />
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { TableColumnCtx } from 'element-plus'

interface Journal {
  name: string
  date: string
  yxyz: string
  ywbt: string
  jcr: string
  gcfq: string
  nfwl: string
  zszb: string
  opensource: string
  sfgc: string
  issn?: string
  abbr?: string
  category?: string
}

const searchValue = ref('')
const searchType = ref('name')
const impactFactor = ref({ min: '', max: '' })
const jcrPartition = ref('')
const cnPartition = ref('')
const ratio = ref('')

const pageSize = 10
const currentPage = ref(1)
const total = computed(() => filteredTableData.value.length)

const jcrOptions = [
  { value: '', label: '不限' },
  { value: 'Q1', label: 'Q1' },
  { value: 'Q2', label: 'Q2' },
  { value: 'Q3', label: 'Q3' },
  { value: 'Q4', label: 'Q4' }
]

const cnOptions = [
  { value: '', label: '不限' },
  { value: '1区', label: '1区' },
  { value: '2区', label: '2区' },
  { value: '3区', label: '3区' },
  { value: '4区', label: '4区' }
]

const ratioOptions = [
  { value: '', label: '不限' },
  { value: '0-5', label: '0~5%' },
  { value: '5-10', label: '5%~10%' },
  { value: '10-20', label: '10%~20%' },
  { value: '20-30', label: '20%~30%' },
  { value: '30-50', label: '30%~50%' },
  { value: '50-100', label: '50%以上' }
]

const tableData: Journal[] = [
  {
    name: 'iufifjofjoeifjewmoiv',
    date: 'SCI/SCIE',
    yxyz: '5.00',
    ywbt: '0.98',
    jcr: 'Q2',
    gcfq: '3区',
    nfwl: '112',
    zszb: '12.70%',
    opensource: '29.38%',
    sfgc: '否',
  },
  {
    name: 'igeiogjeoigjeojg',
    date: 'SCI/SCIE',
    yxyz: '3.26',
    ywbt: '0.73',
    jcr: 'Q3',
    gcfq:'1区',
    nfwl:'98',
    zszb:'18.70%',
    opensource:'15.38%',
    sfgc:'否',
},
{
    name: 'iwejufewifhewuf',
    date: 'SCI/SCIE',
    yxyz: '4.00',
    ywbt: '0.79',
    jcr: 'Q2',
    gcfq:'3区',
    nfwl:'330',
    zszb:'22.59%',
    opensource:'12.33%',
    sfgc:'否',
},
{
    name: 'idihwu9foiwjfifj',
    date: 'SCI/SCIE',
    yxyz: '2.10',
    ywbt: '0.58',
    jcr: 'Q4',
    gcfq:'1区',
    nfwl:'185',
    zszb:'15.57%',
    opensource:'29.25%',
    sfgc:'否',
},
{
    name: 'qwerasdffff',
    date: 'SCI/SCIE',
    yxyz: '2.00',
    ywbt: '0.26',
    jcr: 'Q4',
    gcfq:'3区',
    nfwl:'058',
    zszb:'10.58%',
    opensource:'10.38%',
    sfgc:'否',
},
{
    name: 'qinghuanniubi',
    date: 'SCI/SCIE',
    yxyz: '5.00',
    ywbt: '1.00',
    jcr: 'Q1',
    gcfq:'1区',
    nfwl:'175',
    zszb:'12.70%',
    opensource:'29.38%',
    sfgc:'否',
},
{
    name: 'iufeiwfuhiufeuf',
    date: 'SCI/SCIE',
    yxyz: '3.00',
    ywbt: '0.73',
    jcr: 'Q3',
    gcfq:'3区',
    nfwl:'145',
    zszb:'18.70%',
    opensource:'23.38%',
    sfgc:'否',
},
]

const filteredTableData = ref<Journal[]>(tableData)

const searchTableData = () => {
  filteredTableData.value = tableData.filter(item => {

    const textMatch = searchValue.value ? 
      String(item[searchType.value as keyof Journal]).includes(searchValue.value) : 
      true

    const min = parseFloat(impactFactor.value.min) || 0
    const max = parseFloat(impactFactor.value.max) || Infinity
    const factor = parseFloat(item.yxyz) || 0
    const factorMatch = factor >= min && factor <= max

    const jcrMatch = jcrPartition.value ? item.jcr === jcrPartition.value : true

    const cnMatch = cnPartition.value ? item.gcfq === cnPartition.value : true

    const ratioMatch = true 

    return textMatch && factorMatch && jcrMatch && cnMatch && ratioMatch
  })
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style>
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-top-box {
  background: white;
  padding: 20px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.app-container {
  width: 1280px;
  margin: 0 auto;
}

.fl4 {
  display: flex;
  gap: 20px;
  margin: 15px 30px 0 30px;
  justify-content: space-between;
}

.fl4 > div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fl4 span {
    font-size: 14px;
    color: #000;
}

.fl4-1-1 {
  display: flex;
  align-items: center;
  gap: 5px;
}

.bottom-element {
  width: 1280px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.el-table {
  margin-top: 20px;
}

.el-input__inner {
  text-align: center;
}
</style>